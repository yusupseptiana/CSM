import React from "react";
import { Link } from "react-router-dom";
import "./program.css";

const consultingPrograms = [
  {
    title: "Human Capital",
    desc: "Pendampingan pengembangan SDM, sistem evaluasi kerja, dan strategi peningkatan kompetensi karyawan."
  },
  {
    title: "Coaching",
    desc: "Pendampingan individu maupun tim untuk meningkatkan performa, fokus kerja, dan pencapaian target organisasi."
  },
  {
    title: "Annual Report",
    desc: "Membantu penyusunan laporan tahunan yang sistematis, profesional, dan representatif terhadap kinerja organisasi."
  },
  {
    title: "Manajemen & Keuangan",
    desc: "Pendampingan dalam penguatan manajemen, efisiensi operasional, serta pengelolaan keuangan yang lebih terarah."
  },
  {
    title: "Corporate Culture",
    desc: "Membantu organisasi membangun budaya kerja yang produktif, kolaboratif, dan sejalan dengan visi perusahaan."
  },
  {
    title: "Management Information System",
    desc: "Analisis dan pengembangan sistem informasi untuk mendukung proses bisnis dan pengambilan keputusan."
  }
];

function ConsultingPage() {
  return (
    <div className="program-page">
      <div className="container">
        <section className="program-hero">
          <span className="program-badge">CSM Consulting</span>
          <h1 className="program-title">Solusi Konsultasi untuk Organisasi yang Lebih Efektif</h1>
          <p className="program-subtitle">
            Layanan consulting CSM hadir untuk membantu perusahaan, instansi, dan lembaga
            dalam menyelesaikan tantangan organisasi melalui pendekatan analitis, strategis,
            dan berorientasi hasil.
          </p>

          <div className="highlight-grid">
            <div className="highlight-card">
              <h4>Pendekatan strategis</h4>
              <p>Setiap solusi disusun berdasarkan kebutuhan nyata dan kondisi organisasi.</p>
            </div>
            <div className="highlight-card">
              <h4>Fleksibel dan terarah</h4>
              <p>Program konsultasi dapat disesuaikan dengan skala dan fokus masalah klien.</p>
            </div>
            <div className="highlight-card">
              <h4>Berbasis peningkatan kinerja</h4>
              <p>Tujuan utama adalah membangun organisasi yang lebih kuat dan efektif.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Bidang Layanan Consulting</h2>
          <p className="section-text">
            Berikut beberapa bidang konsultasi yang tersedia untuk mendukung pengembangan organisasi secara menyeluruh.
          </p>

          <div className="row">
            {consultingPrograms.map((item, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card program-card">
                  <div className="card-body">
                    <div className="program-number">{index + 1}</div>
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-box">
          <h3>Butuh solusi dan pendampingan yang tepat?</h3>
          <p>
            Diskusikan kebutuhan organisasi Anda bersama tim CSM untuk mendapatkan
            layanan konsultasi yang sesuai dan berdampak.
          </p>
          <Link to="/contact" className="cta-button">
            Hubungi Kami
          </Link>
        </section>
      </div>
    </div>
  );
}

export default ConsultingPage;