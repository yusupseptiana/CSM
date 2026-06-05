import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/training")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section id="home" className="hero-section">

        <div className="container">

          <div className="hero-box glass">

            <h1 className="hero-title">
              Professional Training
              <br />
              & Consulting
            </h1>

            <p className="hero-text">
              Meningkatkan kualitas SDM di bidang
              perbankan, industri, dan hospitality
            </p>

            <button className="hero-btn">
              Lihat Jadwal
            </button>

          </div>

        </div>

      </section>

      {/* PROFILE PERUSAHAAN */}
      <section id="about" className="section">

        <div className="container">

          <h2 className="section-title">
            Profil Perusahaan
          </h2>

          <div className="glass p-5">

            <div className="row align-items-center">

              {/* KIRI */}
              <div className="col-md-6">

                <h3
                  className="fw-bold text-white mb-4"
                  style={{ fontSize: "40px" }}
                >
                  PT. Citra Selaras Mandiri
                </h3>

                <p
                  className="text-white"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9"
                  }}
                >
                  PT. Citra Selaras Mandiri merupakan perusahaan
                  yang bergerak di bidang pelatihan profesional,
                  pengembangan sumber daya manusia, dan konsultasi bisnis.

                  <br /><br />

                  Kami menyediakan berbagai program training
                  modern untuk meningkatkan kompetensi karyawan
                  dan perusahaan di bidang perbankan,
                  industri, hospitality, dan pelayanan publik.

                  <br /><br />

                  Dengan trainer profesional dan metode pembelajaran
                  interaktif, kami berkomitmen membantu perusahaan
                  mencapai kualitas SDM yang unggul dan kompetitif.
                </p>

              </div>

              {/* KANAN */}
              <div className="col-md-6 text-center">

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="company"
                  className="img-fluid rounded-4 shadow"
                  style={{
                    maxHeight: "420px",
                    objectFit: "cover"
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* LAYANAN */}
      <section className="container py-5">
        <h2 className="text-center mb-4 fw-bold">
          Layanan Kami
        </h2>

        <div className="row">

          <div className="col-md-4">
            <div className="glass glass-card shadow p-4 border-0">
              <h5>Public Training</h5>
              <p>
                Pelatihan terbuka untuk umum dengan jadwal rutin
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass glass-card shadow p-4 border-0">
              <h5>Inhouse Training</h5>
              <p>
                Pelatihan khusus untuk perusahaan Anda
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass glass-card shadow p-4 border-0">
              <h5>Consulting</h5>
              <p>
                Konsultasi profesional sesuai kebutuhan bisnis
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* JADWAL */}
      <section id="jadwal" className="bg-light py-5">
        <div className="container">

          <h2 className="text-center mb-4 fw-bold">
            Jadwal Training
          </h2>

          <table className="table table-bordered text-center shadow">
            <thead className="table-dark">
              <tr>
                <th>Nama</th>
                <th>Tanggal</th>
                <th>Durasi</th>
                <th>Tempat</th>
                <th>Harga</th>
              </tr>
            </thead>

            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.nama}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.durasi}</td>
                  <td>{item.tempat}</td>
                  <td>Rp {item.harga}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </section>

      {/* TESTIMONI */}
      <section id="testimoni" className="container py-5">

        <h2 className="text-center mb-4 fw-bold">
          Testimoni
        </h2>

        <div className="row">

          <div className="col-md-6">
            <div className="glass glass-card p-4 shadow border-0">
              <p>
                "Training sangat membantu dan aplikatif."
              </p>

              <strong>- Perusahaan A</strong>
            </div>
          </div>

          <div className="col-md-6">
            <div className="glass glass-card p-4 shadow border-0">
              <p>
                "Trainer sangat profesional."
              </p>

              <strong>- Perusahaan B</strong>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="bg-dark text-white text-center p-5">
        <h3>Siap meningkatkan skill tim Anda?</h3>

        <button className="btn btn-warning mt-3">
          Hubungi Kami
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-3">
        <p>© 2026 PT. Citra Selaras Mandiri</p>
      </footer>

    </div>
  );
}

export default App;