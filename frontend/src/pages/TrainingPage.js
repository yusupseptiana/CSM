import React from "react";
import { Link } from "react-router-dom";
import "./program.css";

const trainingPrograms = [
  {
    title: "Entrepreneurship Program",
    desc: "Membantu peserta memahami dasar kewirausahaan, inovasi usaha, dan strategi membangun bisnis yang berkelanjutan."
  },
  {
    title: "Banking Program",
    desc: "Membahas pelayanan perbankan, operasional, kepatuhan, dan peningkatan kompetensi SDM sektor keuangan."
  },
  {
    title: "Human Capital Program",
    desc: "Berfokus pada pengelolaan SDM, pengembangan kompetensi karyawan, serta peningkatan produktivitas organisasi."
  },
  {
    title: "Leadership Program",
    desc: "Meningkatkan kemampuan kepemimpinan, komunikasi tim, pengambilan keputusan, dan manajemen perubahan."
  },
  {
    title: "Management Information System",
    desc: "Membantu peserta memahami pemanfaatan sistem informasi dalam mendukung proses kerja dan keputusan manajerial."
  },
  {
    title: "Personal Development Program",
    desc: "Mengembangkan kepercayaan diri, komunikasi interpersonal, etika kerja, dan kesiapan profesional."
  },
  {
    title: "Services Program",
    desc: "Membahas service excellence, kepuasan pelanggan, dan peningkatan kualitas pelayanan di berbagai sektor."
  }
];

function TrainingPage() {
  return (
    <div className="program-page">
      <div className="container">
        <section className="program-hero">
          <span className="program-badge">CSM Training Program</span>
          <h1 className="program-title">Pelatihan untuk Meningkatkan Kompetensi dan Profesionalisme</h1>
          <p className="program-subtitle">
            Program training CSM dirancang untuk membantu individu maupun organisasi
            meningkatkan keterampilan, memperkuat daya saing, dan membangun sumber daya
            manusia yang unggul sesuai kebutuhan dunia kerja.
          </p>

          <div className="highlight-grid">
            <div className="highlight-card">
              <h4>Praktis dan aplikatif</h4>
              <p>Materi disusun agar mudah diterapkan langsung di dunia kerja.</p>
            </div>
            <div className="highlight-card">
              <h4>Instruktur berpengalaman</h4>
              <p>Dipandu oleh praktisi dan narasumber yang kompeten di bidangnya.</p>
            </div>
            <div className="highlight-card">
              <h4>Berorientasi hasil</h4>
              <p>Fokus pada peningkatan kompetensi yang terukur dan relevan.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Materi Program Training</h2>
          <p className="section-text">
            CSM menyediakan berbagai tema pelatihan yang dapat disesuaikan dengan kebutuhan peserta,
            perusahaan, maupun lembaga.
          </p>

          <div className="row">
            {trainingPrograms.map((item, index) => (
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
          <h3>Siap mengembangkan SDM yang lebih unggul?</h3>
          <p>
            Pilih program training yang sesuai dengan kebutuhan organisasi Anda dan
            tingkatkan kualitas kompetensi secara lebih terarah.
          </p>
          <Link className="cta-button" to="/register">Daftar Sekarang</Link>
        </section>
      </div>
    </div>
  );
}

export default TrainingPage;