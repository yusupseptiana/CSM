const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua training
router.get("/", (req, res) => {
  db.query("SELECT * FROM training", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// GET detail training
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM training WHERE id_training = ?",
    [id],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result[0]);
    }
  );
});

// TAMBAH training
router.post("/", (req, res) => {
  const { nama_training, deskripsi, tanggal, kuota } = req.body;

  const sql = "INSERT INTO training (nama_training, deskripsi, tanggal, kuota) VALUES (?, ?, ?, ?)";

  db.query(sql, [nama_training, deskripsi, tanggal, kuota], (err, result) => {
    if (err) return res.send(err);
    res.json({ message: "Training berhasil ditambahkan" });
  });
});

module.exports = router;