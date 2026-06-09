const express = require("express");
const router = express.Router();
const pool = require("../db");

// submit pesan & kesan dari user
router.post("/", async (req, res) => {
  const { nama, email, jabatan, perusahaan, pesan, kesan, rating } = req.body;

  try {
    await pool.query(
      `INSERT INTO feedbacks (nama, email, jabatan, perusahaan, pesan, kesan, rating)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [nama, email, jabatan, perusahaan, pesan, kesan, rating || 5]
    );

    res.status(201).json({ message: "Pesan & kesan berhasil dikirim" });
  } catch (err) {
    console.error("INSERT FEEDBACK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ambil semua feedback untuk admin dashboard
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM feedbacks ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET FEEDBACK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ambil feedback yang ditampilkan di homepage
router.get("/featured", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM feedbacks
       WHERE status = 'approved' AND is_featured = true
       ORDER BY created_at DESC
       LIMIT 6`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET FEATURED FEEDBACK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// update status dan featured feedback
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, is_featured } = req.body;

  try {
    const result = await pool.query(
      `UPDATE feedbacks
       SET status = $1, is_featured = $2
       WHERE id = $3
       RETURNING *`,
      [status, is_featured, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE FEEDBACK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;