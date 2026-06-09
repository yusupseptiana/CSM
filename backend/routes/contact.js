const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { nama, email, pesan } = req.body;

  if (!nama || !email || !pesan) {
    return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi." });
  }

  console.log("New contact message:", {
    nama,
    email,
    pesan,
    receivedAt: new Date().toISOString()
  });

  return res.status(201).json({ message: "Pesan terkirim. Terima kasih telah menghubungi kami." });
});

module.exports = router;
