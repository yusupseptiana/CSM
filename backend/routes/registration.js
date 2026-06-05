const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ganti dari db ke pool

// POST pendaftaran peserta
router.post("/", async (req, res) => {
    const { training_id, nama, email, no_telepon } = req.body;
    
    // Validasi sederhana
    if (!training_id || !nama || !email) {
        return res.status(400).json({ message: "Training ID, nama, dan email wajib diisi" });
    }
    
    try {
        // 1. Cek kuota tersisa
        const kuotaResult = await pool.query("SELECT kuota FROM training WHERE id = $1", [training_id]);
        
        if (kuotaResult.rows.length === 0) {
            return res.status(404).json({ message: "Training tidak ditemukan" });
        }
        
        const kuota = kuotaResult.rows[0].kuota;
        
        // 2. Hitung jumlah pendaftar yang sudah confirmed untuk training ini
        const countResult = await pool.query(
            "SELECT COUNT(*) as total FROM registrations WHERE training_id = $1 AND status = 'confirmed'", 
            [training_id]
        );
        
        const terisi = parseInt(countResult.rows[0].total);
        
        if (terisi >= kuota) {
            return res.status(400).json({ message: "Kuota training sudah penuh" });
        }
        
        // 3. Simpan pendaftaran dengan status 'pending'
        const sql = `INSERT INTO registrations (training_id, nama, email, no_telepon, status, created_at) 
                     VALUES ($1, $2, $3, $4, 'pending', CURRENT_TIMESTAMP) 
                     RETURNING id`;
        
        const result = await pool.query(sql, [training_id, nama, email, no_telepon]);
        
        res.status(201).json({ 
            message: "Pendaftaran berhasil, menunggu konfirmasi admin", 
            id: result.rows[0].id 
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;