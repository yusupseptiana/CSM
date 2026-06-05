const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ganti dari db ke pool
const bcrypt = require("bcryptjs");

// Middleware cek login admin
const isAdmin = (req, res, next) => {
    if (req.session && req.session.adminLoggedIn) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized, silakan login terlebih dahulu" });
    }
};

// Login admin
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const result = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Username atau password salah" });
        }
        
        const admin = result.rows[0];
        
        // Bandingkan password (masih plain text, nanti ganti bcrypt.compare)
        // TODO: Ganti dengan bcrypt.compare(password, admin.password_hash)
        if (password !== admin.password_hash) {
            return res.status(401).json({ message: "Username atau password salah" });
        }
        
        req.session.adminLoggedIn = true;
        req.session.adminId = admin.id;
        res.json({ message: "Login sukses", redirect: "/admin/dashboard" });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logout berhasil" });
});

// GET semua pendaftaran (bisa filter training_id)
router.get("/registrations", isAdmin, async (req, res) => {
    let sql = `
        SELECT r.*, t.nama_training, t.tanggal, t.tempat 
        FROM registrations r 
        JOIN training t ON r.training_id = t.id
    `;
    const params = [];
    
    if (req.query.training_id) {
        sql += " WHERE r.training_id = $1";
        params.push(req.query.training_id);
    }
    sql += " ORDER BY r.created_at DESC";
    
    try {
        const result = await pool.query(sql, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update status pendaftaran
router.put("/registrations/:id/status", isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: "Status tidak valid" });
    }
    
    try {
        await pool.query("UPDATE registrations SET status = $1 WHERE id = $2", [status, id]);
        res.json({ message: "Status berhasil diupdate" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// CRUD Training (untuk admin)

// GET semua training
router.get("/trainings", isAdmin, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM training ORDER BY tanggal DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// POST training baru
router.post("/trainings", isAdmin, async (req, res) => {
    const { nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota } = req.body;
    
    const sql = `INSERT INTO training (nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 RETURNING id`;
    
    try {
        const result = await pool.query(sql, [nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota]);
        res.status(201).json({ 
            message: "Training berhasil ditambahkan", 
            id: result.rows[0].id 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE training
router.put("/trainings/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    const { nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota } = req.body;
    
    const sql = `UPDATE training 
                 SET nama_training = $1, deskripsi = $2, tanggal = $3, durasi = $4, tempat = $5, harga = $6, kuota = $7 
                 WHERE id = $8`;
    
    try {
        await pool.query(sql, [nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota, id]);
        res.json({ message: "Training berhasil diupdate" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE training
router.delete("/trainings/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        // Registrations akan terhapus otomatis karena ON DELETE CASCADE
        await pool.query("DELETE FROM training WHERE id = $1", [id]);
        res.json({ message: "Training dihapus" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;