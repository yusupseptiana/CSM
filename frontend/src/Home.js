import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiPath from "./api";
import "./App.css";
import Navbar from "./components/Navbar";

// logo
import bankindonesia from "./assets/partners/BankIndonesia.png";
import bca from "./assets/partners/BCA.png";
import bjbsyariah from "./assets/partners/bjbsyariah.png";
import bni from "./assets/partners/BNI.png";
import bnisyariah from "./assets/partners/BNISyariah.png";
import bri from "./assets/partners/BRI.png";
import chevron from "./assets/partners/chevron.png";
import diskukjabar from "./assets/partners/DiskukJabar.png";
import indofood from "./assets/partners/Indofood.png";
import indolakto from "./assets/partners/Indolakto.png";
import KejaksaanNegeriJakartaBarat from "./assets/partners/KejaksaanNegeriJakartaBarat.png";
import kemkominfo from "./assets/partners/kemkominfo.png";
import m8 from "./assets/partners/M8.png";
import mandiridanapensiun from "./assets/partners/mandiridanapensiun.png";
import mandirisyariah from "./assets/partners/mandirisyariah.png";
import paninbank from "./assets/partners/PaninBank.png";
import ptasiagrandinternational from "./assets/partners/PTAsiaGrandInternational.jpg";
import ptpalindonesialogo from "./assets/partners/PTPALIndonesiaLogo.png";
import seameo from "./assets/partners/Seameo.png";
import topasgaleriahotel from "./assets/partners/topasgaleriahotel.png";
import utomobank from "./assets/partners/UtomoBank.png";

function App() {
  const [data, setData] = useState([]);
  
    const [feedbackForm, setFeedbackForm] = useState({
    nama: "",
    email: "",
    jabatan: "",
    perusahaan: "",
    pesan: "",
    kesan: "",
    rating: 5
  });
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [featuredFeedbacks, setFeaturedFeedbacks] = useState([]);

  const partners = [
    { name: "bankindonesia", logo: bankindonesia },
    { name: "bca", logo: bca },
    { name: "bjbsyariah", logo: bjbsyariah },
    { name: "bni", logo: bni },
    { name: "bnisyariah", logo: bnisyariah },
    { name: "bri", logo: bri },
    { name: "chevron", logo: chevron },
    { name: "diskukjabar", logo: diskukjabar },
    { name: "indofood", logo: indofood },
    { name: "indolakto", logo: indolakto },
    { name: "KejaksaanNegeriJakartaBarat", logo: KejaksaanNegeriJakartaBarat },
    { name: "kemkominfo", logo: kemkominfo },
    { name: "m8", logo: m8 },
    { name: "mandiridanapensiun", logo: mandiridanapensiun },
    { name: "mandirisyariah", logo: mandirisyariah },
    { name: "paninbank", logo: paninbank },
    { name: "ptasiagrandinternational", logo: ptasiagrandinternational },
    { name: "ptpalindonesialogo", logo: ptpalindonesialogo },
    { name: "seameo", logo: seameo },
    { name: "topasgaleriahotel", logo: topasgaleriahotel },
    { name: "utomobank", logo: utomobank }
  ];

  const formatRupiah = (angka) => {
  const number = Number(angka || 0);
  return "Rp." + number.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    axios.get(apiPath('/training'))
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    axios.get(apiPath("/feedbacks/featured"))
    .then((res) => setFeaturedFeedbacks(Array.isArray(res.data) ? res.data : []))
    .catch((err) => console.log(err));
  }, []);

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackLoading(true);
    setFeedbackMessage("");

    try {
      await axios.post(apiPath("/feedbacks"), feedbackForm);
      setFeedbackMessage("Pesan & kesan berhasil dikirim.");
      setFeedbackForm({
        nama: "",
        email: "",
        jabatan: "",
        perusahaan: "",
        pesan: "",
        kesan: "",
        rating: 5
      });
    } catch (error) {
      setFeedbackMessage("Gagal mengirim pesan & kesan.");
    } finally {
      setFeedbackLoading(false);
    }
  };

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
              <div className="col-md-6 border-end pe-md-4"
              style={{ borderRight: "1px solid rgba(255,255,255,0.35)" }}
              >
              

                <h3
                  className="fw-bold text-white mb-4 text-center"
                  style={{ fontSize: "40px" }}
                >
                  Aboute CSM Training & Consulting
                </h3>

                <p
                  className="text-white"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9",
                    textAlign: "justify"
                  }}
                >
                  CSM Training & Consulting adalah salah satu divisi dari PT CITRA SELARAS MANDIRI yang bergerak di bidang pendidikan dan pelatihan serta jasa konsultan baik <i>public  training</i> maupun <i>inhouse training</i>, yang menawarkan sebuah solusi terintegrasi, efektif, efisien, dan mitra yang tepat bagi perusahaan anda dalam mempersiapkan dan mengembangkan Sumber Daya Manusia (<i>Humman Capital</i>). Berdiri pada tahun 1990 di Jakarta dengan Foundernya adalah Bapak H.Djamalun Sablie yang berpengalaman di bank milik pemerintah dan bidang usaha lainnya.
                </p>

              </div>

              {/* KANAN */}
              <div className="col-md-6 text-center ps-md-4">

                <h3
                  className="fw-bold text-white mb-2 text-center"
                  style={{ fontSize: "20px" }}
                >
                  WHY US?
                  <br/>
                  _______________________
                </h3>

                <p
                  className="text-white"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9",
                    textAlign: "justify"
                  }}
                >
                  CSM berkomitmen untuk secara konsisten memberikan nilai tambah, pelayanan prima dan solusi yang efektif pada setiap pelaksanaan kegiatan kepada anda sesuai dengan <i>Tag Line</i> kami yaitu:
                  </p>

                  <p
                    className="text-white"
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.9",
                    }}
                  >
                  <strong><i>"We Deliver Value - Added"</i></strong>
                  <br/><br/>
                  </p>

                <h3
                  className="fw-bold text-white mb-2 text-center"
                  style={{ fontSize: "20px" }}
                >
                  COMPREHENSIVE
                  <br/>
                  _______________________
                </h3>

                <p
                  className="text-white"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9"
                  }}
                >
                  Pelatihan dikemas dengan pendekatan secara komprehensif menyeluruh.
                </p>

                <h3
                  className="fw-bold text-white mb-2 text-center"
                  style={{ fontSize: "20px" }}
                >
                  EXPERTISE/PRAKTISI
                  <br/>
                  _______________________
                </h3>

                <p
                  className="text-white"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.9"
                  }}
                >
                  Memiliki pengajar dengan latar belakang akademisi dan praktisi yang berpengalaman di bidangnya masing-masing.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      
      {/* OUR PARTNER */}
      <section id="partner" className="container py-5">
        <h2 className="text-center text-white mb-5 fw-bold">Our Partner</h2>
        <div className="row justify-content-center align-items-center">
          {partners.map((partner, index) => (
            <div className="col-6 col-md-4 col-lg-2 mb-4 text-center" key={index}>
              <div className="glass glass-card p-3 h-100 d-flex align-items-center justify-content-center bg-white">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="img-fluid"
                  style={{ maxHeight: "70px", objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYANAN */}
      <section className="container py-5">
        <h2 className="text-center mb-4 fw-bold text-white">
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
              {Array.isArray(data) ? data.map(item => (
                <tr key={item.id}>
                  <td>{item.nama_training}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.durasi}</td>
                  <td>{item.tempat}</td>
                  <td>{formatRupiah(item.harga)}</td>
                </tr>
              )) : null}
            </tbody>
          </table>

        </div>
      </section>

      {/* TESTIMONI */}
      <section id="testimoni" className="container py-5">
        <h2 className="text-center mb-4 fw-bold text-white">
          Testimoni
        </h2>

        <div className="row">
          {featuredFeedbacks.length > 0 ? (
            featuredFeedbacks.map((item) => (
              <div className="col-md-6 mb-4" key={item.id}>
                <div className="glass glass-card p-4 shadow border-0 h-100">
                  <p>"{item.pesan}"</p>
                  {item.kesan && <p className="mt-2">{item.kesan}</p>}
                  <strong>
                    - {item.nama}
                    {item.perusahaan ? `, ${item.perusahaan}` : ""}
                  </strong>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="col-md-6">
                <div className="glass glass-card p-4 shadow border-0">
                  <p>"Training sangat membantu dan aplikatif."</p>
                  <strong>- Perusahaan A</strong>
                </div>
              </div>

              <div className="col-md-6">
                <div className="glass glass-card p-4 shadow border-0">
                  <p>"Trainer sangat profesional."</p>
                  <strong>- Perusahaan B</strong>
                </div>
              </div>
            </>
          )}
        </div>
      </section>


{/* //pesan dan kesan */}
      <section className="feedback-section" id="pesan-kesan">
        <div className="container">
          <div className="feedback-wrapper">
            <div className="feedback-copy">
              <span className="feedback-badge">Pesan & Kesan</span>
              <h2>Sampaikan pengalaman Anda setelah mengikuti training</h2>
              <p>
                Masukan dari peserta membantu kami meningkatkan kualitas layanan
                training dan consulting. Feedback yang sesuai juga dapat dipilih
                admin untuk ditampilkan di website.
              </p>
            </div>

            <div className="feedback-form-card">
              <form onSubmit={handleFeedbackSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      className="form-control"
                      value={feedbackForm.nama}
                      onChange={handleFeedbackChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={feedbackForm.email}
                      onChange={handleFeedbackChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Jabatan</label>
                    <input
                      type="text"
                      name="jabatan"
                      className="form-control"
                      value={feedbackForm.jabatan}
                      onChange={handleFeedbackChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Perusahaan</label>
                    <input
                      type="text"
                      name="perusahaan"
                      className="form-control"
                      value={feedbackForm.perusahaan}
                      onChange={handleFeedbackChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Rating</label>
                    <select
                      name="rating"
                      className="form-select"
                      value={feedbackForm.rating}
                      onChange={handleFeedbackChange}
                    >
                      <option value={5}>5 - Sangat Baik</option>
                      <option value={4}>4 - Baik</option>
                      <option value={3}>3 - Cukup</option>
                      <option value={2}>2 - Kurang</option>
                      <option value={1}>1 - Sangat Kurang</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Pesan</label>
                    <textarea
                      name="pesan"
                      className="form-control"
                      rows="3"
                      value={feedbackForm.pesan}
                      onChange={handleFeedbackChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Kesan</label>
                    <textarea
                      name="kesan"
                      className="form-control"
                      rows="3"
                      value={feedbackForm.kesan}
                      onChange={handleFeedbackChange}
                    />
                  </div>
                </div>

                {feedbackMessage && (
                  <div className="feedback-alert mt-3">
                    {feedbackMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="feedback-submit-btn mt-4"
                  disabled={feedbackLoading}
                >
                  {feedbackLoading ? "Mengirim..." : "Kirim Pesan & Kesan"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="bg-dark text-white text-center p-5">
        <h3>Siap meningkatkan skill tim Anda?</h3>

        <Link to="/contact" className="hero-btn" style={{display: 'inline-block', textDecoration: 'none', textAlign: 'center'}}>
          Hubungi Kami
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-3">
        <p>© 2026 PT. Citra Selaras Mandiri</p>
      </footer>

    </div>
  );
}

export default App;