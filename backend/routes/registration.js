const express = require("express");
const router = express.Router();
const db = require("../db");

// POST pendaftaran peserta
router.post("/", (req, res) => {
    const { training_id, nama, email, no_telepon } = req.body;
    
    // Validasi sederhana
    if (!training_id || !nama || !email) {
        return res.status(400).json({ message: "Training ID, nama, dan email wajib diisi" });
    }
    
    // Cek kuota tersisa
    db.query("SELECT kuota FROM training WHERE id = ?", [training_id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Training tidak ditemukan" });
        
        const kuota = results[0].kuota;
        // Hitung jumlah pendaftar yang sudah confirmed untuk training ini
        db.query("SELECT COUNT(*) as total FROM registrations WHERE training_id = ? AND status = 'confirmed'", [training_id], (err, countResult) => {
            if (err) return res.status(500).json(err);
            const terisi = countResult[0].total;
            if (terisi >= kuota) {
                return res.status(400).json({ message: "Kuota training sudah penuh" });
            }
            
            // Simpan pendaftaran dengan status 'pending'
            const sql = "INSERT INTO registrations (training_id, nama, email, no_telepon, status) VALUES (?, ?, ?, ?, 'pending')";
            db.query(sql, [training_id, nama, email, no_telepon], (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ message: "Pendaftaran berhasil, menunggu konfirmasi admin", id: result.insertId });
            });
        });
    });
});

module.exports = router;