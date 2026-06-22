import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import apiPath from "../api";

function RegistrationForm() {
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({
    training_id: "",
    nama: "",
    email: "",
    no_telepon: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(apiPath('/training'))
      .then(res => setTrainings(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const waWindow = window.open("", "_blank");

  try {
    const res = await axios.post(apiPath('/register'), form);

    const selectedTraining = trainings.find(
      (t) => String(t.id || t.id_training) === String(form.training_id)
    );

    const trainingName = selectedTraining?.nama_training || "-";
    const trainingDate = selectedTraining?.tanggal
      ? new Date(selectedTraining.tanggal).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

    const phoneNumber = "6285163096311";

    const text = `
Halo CSM Training & Consulting,

Saya sudah mengisi form pendaftaran training dan ingin melanjutkan konfirmasi pembayaran.

Detail pendaftar:
Nama: ${form.nama}
Email: ${form.email}
No. Telepon: ${form.no_telepon}

Detail training:
Training: ${trainingName}
Tanggal: ${trainingDate}

Mohon info metode pembayaran selanjutnya.
    `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    setMessage(res.data?.message || "Pendaftaran berhasil!");

    if (waWindow) {
      waWindow.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, "_blank");
    }

    setForm({ training_id: "", nama: "", email: "", no_telepon: "" });
  } catch (err) {
    if (waWindow) waWindow.close();
    setMessage(err.response?.data?.message || "Terjadi kesalahan");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="glass p-4 p-md-5">
              <h2 className="text-white text-center mb-4">Form Pendaftaran Training</h2>

              {message && (
                <div className={`alert ${message.includes("berhasil") ? "alert-success" : "alert-danger"} text-center`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Pilih Training</label>
                  <select
                    name="training_id"
                    className="form-control form-select"
                    value={form.training_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Training --</option>
                    {Array.isArray(trainings) && trainings.length > 0 ? trainings.map(t => {
                      const tanggal = new Date(t.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      });

                      return (
                        <option key={t.id || t.id_training} value={t.id || t.id_training}>
                          {t.nama_training} - {tanggal} (Rp {Number(t.harga).toLocaleString('id-ID')})
                        </option>
                      );
                    }) : (
                      <option value="" disabled>Tidak ada training tersedia</option>
                    )}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    className="form-control"
                    value={form.nama}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">No. Telepon</label>
                  <input
                    type="tel"
                    name="no_telepon"
                    className="form-control"
                    value={form.no_telepon}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Memproses..." : "Daftar Sekarang"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;