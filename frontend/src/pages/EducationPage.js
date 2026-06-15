import React from "react";
import { Link } from "react-router-dom";
import "./program.css";

const educationPrograms = [
  {
    title: "Pengembangan Kompetensi",
    desc: "Meningkatkan pemahaman dasar dan lanjutan sesuai kebutuhan akademik maupun profesional."
  },
  {
    title: "Keterampilan Praktis",
    desc: "Melatih peserta agar memiliki kemampuan yang dapat langsung diterapkan dalam kegiatan belajar dan kerja."
  },
  {
    title: "Komunikasi & Presentasi",
    desc: "Membantu peserta membangun kemampuan berbicara, presentasi, dan komunikasi interpersonal."
  },
  {
    title: "Kepemimpinan & Kerja Sama Tim",
    desc: "Mengembangkan jiwa kepemimpinan, kolaborasi, dan tanggung jawab dalam lingkungan organisasi."
  },
  {
    title: "Teknologi & Sistem Informasi",
    desc: "Mengenalkan pemanfaatan teknologi serta sistem informasi untuk mendukung pembelajaran dan pekerjaan."
  },
  {
    title: "Karakter & Profesionalisme",
    desc: "Membantu membangun etika, disiplin, integritas, dan kesiapan peserta dalam dunia profesional."
  }
];

function EducationPage() {
  return (
    <div className="program-page">
      <div className="container">
        <section className="program-hero">
          <span className="program-badge">CSM Education</span>
          <h1 className="program-title">Pendidikan dan Pengembangan Diri yang Lebih Terarah</h1>
          <p className="program-subtitle">
            Program education CSM ditujukan untuk membantu peserta meningkatkan wawasan,
            keterampilan, dan kesiapan diri agar lebih siap menghadapi tantangan pendidikan
            maupun dunia kerja.
          </p>

          <div className="highlight-grid">
            <div className="highlight-card">
              <h4>Pembelajaran terstruktur</h4>
              <p>Materi disusun bertahap agar peserta dapat berkembang secara sistematis.</p>
            </div>
            <div className="highlight-card">
              <h4>Fokus pada pengembangan diri</h4>
              <p>Program mendorong peningkatan kemampuan akademik sekaligus soft skills.</p>
            </div>
            <div className="highlight-card">
              <h4>Relevan dengan kebutuhan masa kini</h4>
              <p>Materi menyesuaikan perkembangan dunia pendidikan dan profesional.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Materi Program Education</h2>
          <p className="section-text">
            Program education mencakup penguatan kompetensi, keterampilan praktis,
            dan pembentukan karakter yang mendukung perkembangan peserta.
          </p>

          <div className="row">
            {educationPrograms.map((item, index) => (
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
          <h3>Mulai perjalanan pengembangan dirimu</h3>
          <p>
            Temukan program education yang sesuai untuk meningkatkan potensi,
            kompetensi, dan kesiapan menghadapi masa depan.
          </p>
          <Link className="cta-button" to="/register">Daftar Sekarang</Link>
        </section>
      </div>
    </div>
  );
}

export default EducationPage;