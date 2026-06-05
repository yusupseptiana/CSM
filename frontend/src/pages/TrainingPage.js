import React from "react";
import "./TrainingPage.css";
import Navbar from "../components/Navbar";

function TrainingPage() {
  return (
  <>  
  <Navbar />  
    <div className="training-page">

      {/* HERO */}
      <section className="training-hero">
        <div className="container text-center">

          <h1 className="training-title">
            Program Training Profesional
          </h1>

          <p className="training-subtitle">
            Tingkatkan kualitas SDM perusahaan Anda
            bersama PT. Citra Selaras Mandiri
          </p>

        </div>
      </section>

      {/* LIST TRAINING */}
      <section className="container py-5">

        <h2 className="section-title text-center mb-5">
          Daftar Training
        </h2>

        <div className="row g-4">

          {/* CARD 1 */}
          <div className="col-md-4">
            <div className="glass-card">

              <h3>Leadership Training</h3>

              <p>
                Pelatihan kepemimpinan untuk meningkatkan
                kemampuan manajemen tim dan organisasi.
              </p>

              <ul>
                <li>Durasi: 3 Hari</li>
                <li>Level: Intermediate</li>
                <li>Sertifikat Resmi</li>
              </ul>

              <button className="training-btn">
                Daftar Sekarang
              </button>

            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-md-4">
            <div className="glass-card">

              <h3>Public Speaking</h3>

              <p>
                Meningkatkan kemampuan komunikasi,
                presentasi, dan public speaking.
              </p>

              <ul>
                <li>Durasi: 2 Hari</li>
                <li>Level: Beginner</li>
                <li>Sertifikat Resmi</li>
              </ul>

              <button className="training-btn">
                Daftar Sekarang
              </button>

            </div>
          </div>

          {/* CARD 3 */}
          <div className="col-md-4">
            <div className="glass-card">

              <h3>Customer Service</h3>

              <p>
                Pelatihan pelayanan pelanggan untuk
                meningkatkan kepuasan customer.
              </p>

              <ul>
                <li>Durasi: 1 Hari</li>
                <li>Level: Beginner</li>
                <li>Sertifikat Resmi</li>
              </ul>

              <button className="training-btn">
                Daftar Sekarang
              </button>

            </div>
          </div>

        </div>

      </section>

      {/* BENEFIT */}
      <section className="container py-5">

        <div className="glass-box">

          <h2 className="text-center mb-4">
            Kenapa Memilih Kami?
          </h2>

          <div className="row text-center">

            <div className="col-md-4">
              <h4>Trainer Profesional</h4>
              <p>Berpengalaman di berbagai industri.</p>
            </div>

            <div className="col-md-4">
              <h4>Sertifikat Resmi</h4>
              <p>Mendapatkan sertifikat setelah training.</p>
            </div>

            <div className="col-md-4">
              <h4>Materi Modern</h4>
              <p>Sesuai kebutuhan industri saat ini.</p>
            </div>

          </div>

        </div>

      </section>

    </div>
  </>  
  );
}

export default TrainingPage;
