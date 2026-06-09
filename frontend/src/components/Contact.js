import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiPath from "../api";
import Navbar from "./Navbar";

function Contact() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });
    setLoading(true);

    try {
      const res = await axios.post(apiPath("/contact"), form);
      setStatus({ message: res.data.message || "Pesan berhasil dikirim.", type: "success" });
      setForm({ nama: "", email: "", pesan: "" });
    } catch (err) {
      setStatus({ message: err.response?.data?.message || "Terjadi kesalahan saat mengirim pesan.", type: "error" });
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
              <h2 className="text-white text-center mb-4">Hubungi Kami</h2>

              <p className="text-white text-center">Jika Anda memiliki pertanyaan, silakan isi formulir di bawah atau kirim email ke <strong>info@csm.co.id</strong>.</p>

              {status.message && (
                <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    className="form-control"
                    placeholder="Nama Anda"
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
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pesan</label>
                  <textarea
                    name="pesan"
                    className="form-control"
                    rows="4"
                    placeholder="Tulis pesan Anda..."
                    value={form.pesan}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/admin/login" className="btn btn-sm btn-outline-light">Admin</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
