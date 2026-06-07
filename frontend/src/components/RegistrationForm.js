import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; 

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
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/training`)
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
    try {
      // const res = await axios.post("http://localhost:5000/api/register", form);
      setMessage("Pendaftaran berhasil! Silakan tunggu konfirmasi dari admin.");
      setForm({ training_id: "", nama: "", email: "", no_telepon: "" });
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
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
                    className="form-control"
                    value={form.training_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Training --</option>
                    {trainings.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.nama_training} - {t.tanggal} (Rp {t.harga?.toLocaleString()})
                      </option>
                    ))}
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