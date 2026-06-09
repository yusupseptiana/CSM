const express = require("express");
const router = express.Router();
const pool = require("../db");
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

    // sementara masih plain text
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

// Statistik dashboard
router.get("/stats", isAdmin, async (req, res) => {
  try {
    const totalTraining = await pool.query("SELECT COUNT(*) AS total FROM training");
    const totalRegistrations = await pool.query("SELECT COUNT(*) AS total FROM registrations");
    const pendingRegistrations = await pool.query("SELECT COUNT(*) AS total FROM registrations WHERE status = 'pending'");
    const confirmedRegistrations = await pool.query("SELECT COUNT(*) AS total FROM registrations WHERE status = 'confirmed'");

    res.json({
      totalTraining: Number(totalTraining.rows[0].total),
      totalRegistrations: Number(totalRegistrations.rows[0].total),
      pendingRegistrations: Number(pendingRegistrations.rows[0].total),
      confirmedRegistrations: Number(confirmedRegistrations.rows[0].total)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET semua pendaftaran
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

// Update full data pendaftaran
router.put("/registrations/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { nama, email, no_telepon, training_id, status } = req.body;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Status tidak valid" });
  }

  try {
    await pool.query(
      `UPDATE registrations
       SET nama = $1, email = $2, no_telepon = $3, training_id = $4, status = $5
       WHERE id = $6`,
      [nama, email, no_telepon, training_id, status, id]
    );

    res.json({ message: "Data pendaftaran berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update status pendaftaran saja
router.put("/registrations/:id/status", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
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

// Hapus pendaftaran
router.delete("/registrations/:id", isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM registrations WHERE id = $1", [id]);
    res.json({ message: "Pendaftaran berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

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

  try {
    const result = await pool.query(
      `INSERT INTO training (nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota]
    );

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

  try {
    await pool.query(
      `UPDATE training
       SET nama_training = $1, deskripsi = $2, tanggal = $3, durasi = $4, tempat = $5, harga = $6, kuota = $7
       WHERE id = $8`,
      [nama_training, deskripsi, tanggal, durasi, tempat, harga, kuota, id]
    );

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
    await pool.query("DELETE FROM training WHERE id = $1", [id]);
    res.json({ message: "Training dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET profil admin
router.get("/profile", isAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username FROM admin WHERE id = $1",
      [req.session.adminId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE profil admin
router.put("/profile", isAdmin, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (password && password.trim() !== "") {
      await pool.query(
        "UPDATE admin SET username = $1, password_hash = $2 WHERE id = $3",
        [username, password, req.session.adminId]
      );
    } else {
      await pool.query(
        "UPDATE admin SET username = $1 WHERE id = $2",
        [username, req.session.adminId]
      );
    }

    res.json({ message: "Profil admin berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET semua feedback
router.get("/feedbacks", isAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM feedbacks ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE feedback (approve / reject / featured)
router.put("/feedbacks/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { nama, email, jabatan, perusahaan, pesan, kesan, rating, status, is_featured } = req.body;

  try {
    await pool.query(
      `UPDATE feedbacks
       SET nama = $1,
           email = $2,
           jabatan = $3,
           perusahaan = $4,
           pesan = $5,
           kesan = $6,
           rating = $7,
           status = $8,
           is_featured = $9
       WHERE id = $10`,
      [nama, email, jabatan, perusahaan, pesan, kesan, rating, status, is_featured, id]
    );

    res.json({ message: "Feedback berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE feedback
router.delete("/feedbacks/:id", isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM feedbacks WHERE id = $1", [id]);
    res.json({ message: "Feedback berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;