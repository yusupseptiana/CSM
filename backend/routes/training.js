const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ganti dari db ke pool (karena kita pakai pg Pool)

// GET semua training
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM training ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET detail training
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM training WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Training tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// TAMBAH training
router.post("/", async (req, res) => {
  const { nama_training, deskripsi, tanggal, kuota } = req.body;

  const sql = `INSERT INTO training (nama_training, deskripsi, tanggal, kuota) 
               VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const result = await pool.query(sql, [nama_training, deskripsi, tanggal, kuota]);
    res.json({ 
      message: "Training berhasil ditambahkan",
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;