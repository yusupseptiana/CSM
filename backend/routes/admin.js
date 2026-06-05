const express = require("express");
const router = express.Router();
const db = require("../db");
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
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM admin WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(401).json({ message: "Username atau password salah" });
        
        const admin = results[0];
        // Karena kita pakai bcrypt, bandingkan hash
        if (password !== admin.password_hash) {
            return res.status(401).json({ message: "Username atau password salah" });
        }
        
        req.session.adminLoggedIn = true;
        req.session.adminId = admin.id;
        res.json({ message: "Login sukses", redirect: "/admin/dashboard" });
    });
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logout berhasil" });
});

// GET semua pendaftaran (bisa filter training_id)
router.get("/registrations", isAdmin, (req, res) => {
    let sql = `
        SELECT r.*, t.nama_training, t.tanggal, t.tempat 
        FROM registrations r 
        JOIN training t ON r.training_id = t.id
    `;
    const params = [];
    if (req.query.training_id) {
        sql += " WHERE r.training_id = ?";
        params.push(req.query.training_id);
    }
    sql += " ORDER BY r.created_at DESC";
    
    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Update status pendaftaran
router.put("/registrations/:id/status", isAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: "Status tidak valid" });
    }
    db.query("UPDATE registrations SET status = ? WHERE id = ?", [status, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status berhasil diupdate" });
    });
});

// CRUD Training (untuk admin)
router.get("/trainings", isAdmin, (req, res) => {
    db.query("SELECT * FROM training ORDER BY tanggal DESC", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.post("/trainings", isAdmin, (req, res) => {
    const { nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota } = req.body;
    const sql = "INSERT INTO training (nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Training berhasil ditambahkan", id: result.insertId });
    });
});

router.put("/trainings/:id", isAdmin, (req, res) => {
    const { id } = req.params;
    const { nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota } = req.body;
    const sql = "UPDATE training SET nama_training=?, deskripsi=?, tanggal=?, durasi=?, tempat=?, harga=?, kuota=? WHERE id=?";
    db.query(sql, [nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Training berhasil diupdate" });
    });
});

router.delete("/trainings/:id", isAdmin, (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM training WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Training dihapus" });
    });
});

module.exports = router;