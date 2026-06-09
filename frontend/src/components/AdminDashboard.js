import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import apiPath from "../api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalTraining: 0,
    totalRegistrations: 0,
    pendingRegistrations: 0,
    confirmedRegistrations: 0
  });

  const [registrations, setRegistrations] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const [registrationForm, setRegistrationForm] = useState({
    id: "",
    training_id: "",
    nama: "",
    email: "",
    no_telepon: "",
    status: "pending"
  });
  const [editRegistrationId, setEditRegistrationId] = useState(null);

  const [trainingForm, setTrainingForm] = useState({
    nama_training: "",
    deskripsi: "",
    tanggal: "",
    durasi: "",
    tempat: "",
    harga: "",
    kuota: ""
  });
  const [editTrainingId, setEditTrainingId] = useState(null);

  const [adminForm, setAdminForm] = useState({
    username: "",
    password: ""
  });

  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get(apiPath("/admin/stats"), { withCredentials: true });
      setStats(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [navigate]);

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await axios.get(apiPath("/admin/registrations"), { withCredentials: true });
      setRegistrations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [navigate]);

  const fetchTrainings = useCallback(async () => {
    try {
      const res = await axios.get(apiPath("/admin/trainings"), { withCredentials: true });
      setTrainings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [navigate]);

  const fetchAdminProfile = useCallback(async () => {
    try {
      const res = await axios.get(apiPath("/admin/profile"), { withCredentials: true });
      setAdminForm({
        username: res.data?.username || "",
        password: ""
      });
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchStats(),
        fetchRegistrations(),
        fetchTrainings(),
        fetchAdminProfile()
      ]);
      setLoading(false);
    };

    loadData();
  }, [fetchStats, fetchRegistrations, fetchTrainings, fetchAdminProfile]);

  const resetRegistrationForm = () => {
    setRegistrationForm({
      id: "",
      training_id: "",
      nama: "",
      email: "",
      no_telepon: "",
      status: "pending"
    });
    setEditRegistrationId(null);
  };

  const resetTrainingForm = () => {
    setTrainingForm({
      nama_training: "",
      deskripsi: "",
      tanggal: "",
      durasi: "",
      tempat: "",
      harga: "",
      kuota: ""
    });
    setEditTrainingId(null);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        apiPath(`/admin/registrations/${id}/status`),
        { status },
        { withCredentials: true }
      );
      await fetchRegistrations();
      await fetchStats();
    } catch (err) {
      alert("Gagal update status");
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        apiPath(`/admin/registrations/${editRegistrationId}`),
        registrationForm,
        { withCredentials: true }
      );

      resetRegistrationForm();
      await fetchRegistrations();
      await fetchStats();
      alert("Data pendaftaran berhasil diupdate");
    } catch (err) {
      alert("Gagal update pendaftaran");
    }
  };

  const deleteRegistration = async (id) => {
    if (!window.confirm("Yakin hapus pendaftaran ini?")) return;

    try {
      await axios.delete(apiPath(`/admin/registrations/${id}`), {
        withCredentials: true
      });
      await fetchRegistrations();
      await fetchStats();
    } catch (err) {
      alert("Gagal hapus pendaftaran");
    }
  };

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTrainingId) {
        await axios.put(
          apiPath(`/admin/trainings/${editTrainingId}`),
          trainingForm,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          apiPath("/admin/trainings"),
          trainingForm,
          { withCredentials: true }
        );
      }

      resetTrainingForm();
      await fetchTrainings();
      await fetchStats();
      alert("Data training berhasil disimpan");
    } catch (err) {
      alert("Gagal simpan training");
    }
  };

  const deleteTraining = async (id) => {
    if (!window.confirm("Yakin hapus training ini?")) return;

    try {
      await axios.delete(apiPath(`/admin/trainings/${id}`), {
        withCredentials: true
      });
      await fetchTrainings();
      await fetchStats();
    } catch (err) {
      alert("Gagal hapus training");
    }
  };

  const handleAdminProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(apiPath("/admin/profile"), adminForm, {
        withCredentials: true
      });
      setAdminForm((prev) => ({ ...prev, password: "" }));
      alert("Profil admin berhasil diupdate");
    } catch (err) {
      alert("Gagal update profil admin");
    }
  };

  const logout = async () => {
    try {
      await axios.post(apiPath("/admin/logout"), {}, { withCredentials: true });
      navigate("/admin/login");
    } catch (err) {
      alert("Gagal logout");
    }
  };

  // feedback
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(apiPath("/feedbacks"), { withCredentials: true });
      setFeedbacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const updateFeedback = async (id, status, is_featured) => {
    try {
      await axios.put(
        apiPath(`/feedbacks/${id}`),
        { status, is_featured },
        { withCredentials: true }
      );
      fetchFeedbacks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-shell">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">
              Kelola training, pendaftaran peserta, dan akun admin dari satu halaman.
            </p>
          </div>

          <button onClick={logout} className="btn btn-danger admin-top-btn">
            Logout
          </button>
        </div>

        <ul className="nav admin-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "registrations" ? "active" : ""}`}
              onClick={() => setActiveTab("registrations")}
            >
              Pendaftaran
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "trainings" ? "active" : ""}`}
              onClick={() => setActiveTab("trainings")}
            >
              Training
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Pengaturan Admin
            </button>
            </li>
                    <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "feedback" ? "active" : ""}`}
              onClick={() => setActiveTab("feedback")}
            >
              Feedback
            </button>
          </li>
        </ul>

        {loading && <div className="text-center py-4">Loading...</div>}

        {!loading && activeTab === "overview" && (
          <div className="row g-4">
            <div className="col-md-3">
              <div className="page-card admin-panel text-center">
                <h3 className="mb-2">{stats.totalTraining}</h3>
                <p className="mb-0 text-muted">Total Training</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="page-card admin-panel text-center">
                <h3 className="mb-2">{stats.totalRegistrations}</h3>
                <p className="mb-0 text-muted">Total Pendaftar</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="page-card admin-panel text-center">
                <h3 className="mb-2">{stats.pendingRegistrations}</h3>
                <p className="mb-0 text-muted">Pending</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="page-card admin-panel text-center">
                <h3 className="mb-2">{stats.confirmedRegistrations}</h3>
                <p className="mb-0 text-muted">Confirmed</p>
              </div>
            </div>
          </div>
        )}

        {!loading && activeTab === "registrations" && (
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="page-card admin-panel">
                <h4 className="panel-title">
                  {editRegistrationId ? "Edit Pendaftaran" : "Pilih data untuk diedit"}
                </h4>

                {editRegistrationId ? (
                  <form onSubmit={handleRegistrationSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nama</label>
                      <input
                        type="text"
                        className="form-control"
                        value={registrationForm.nama}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, nama: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={registrationForm.email}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">No. Telepon</label>
                      <input
                        type="text"
                        className="form-control"
                        value={registrationForm.no_telepon}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, no_telepon: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Training</label>
                      <select
                        className="form-select"
                        value={registrationForm.training_id}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, training_id: e.target.value })
                        }
                        required
                      >
                        <option value="">Pilih training</option>
                        {trainings.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.nama_training}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={registrationForm.status}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, status: e.target.value })
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-danger me-2">
                      Simpan Perubahan
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetRegistrationForm}
                    >
                      Batal
                    </button>
                  </form>
                ) : (
                  <p className="text-muted mb-0">
                    Klik tombol edit pada tabel pendaftaran untuk mengubah data peserta.
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-7">
              <div className="page-card admin-panel">
                <h4 className="panel-title">Daftar Pendaftaran</h4>

                <div className="table-responsive">
                  <table className="table table-clean">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Training</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg.id}>
                          <td>{reg.nama}</td>
                          <td>{reg.email}</td>
                          <td>{reg.nama_training}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                reg.status === "confirmed"
                                  ? "status-confirmed"
                                  : reg.status === "cancelled"
                                  ? "status-cancelled"
                                  : "status-pending"
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-2">
                              <select
                                className="form-select form-select-sm table-action-select"
                                value={reg.status}
                                onChange={(e) => updateStatus(reg.id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>

                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setEditRegistrationId(reg.id);
                                  setRegistrationForm({
                                    id: reg.id,
                                    training_id: reg.training_id,
                                    nama: reg.nama,
                                    email: reg.email,
                                    no_telepon: reg.no_telepon || "",
                                    status: reg.status
                                  });
                                }}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteRegistration(reg.id)}
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {registrations.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            Belum ada data pendaftaran.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && activeTab === "trainings" && (
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="page-card admin-panel">
                <h4 className="panel-title">
                  {editTrainingId ? "Edit Training" : "Tambah Training Baru"}
                </h4>

                <form onSubmit={handleTrainingSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nama Training</label>
                    <input
                      type="text"
                      className="form-control"
                      value={trainingForm.nama_training}
                      onChange={(e) =>
                        setTrainingForm({ ...trainingForm, nama_training: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={trainingForm.deskripsi}
                      onChange={(e) =>
                        setTrainingForm({ ...trainingForm, deskripsi: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tanggal</label>
                    <input
                      type="date"
                      className="form-control"
                      value={trainingForm.tanggal}
                      onChange={(e) =>
                        setTrainingForm({ ...trainingForm, tanggal: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Durasi</label>
                    <input
                      type="text"
                      className="form-control"
                      value={trainingForm.durasi}
                      onChange={(e) =>
                        setTrainingForm({ ...trainingForm, durasi: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tempat</label>
                    <input
                      type="text"
                      className="form-control"
                      value={trainingForm.tempat}
                      onChange={(e) =>
                        setTrainingForm({ ...trainingForm, tempat: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                      type="number"
                      className="form-control"
                      value={trainingForm.harga}
                      onChange={(e) =>
                        setTrainingForm({ ...trainingForm, harga: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Kuota</label>
                    <input
                      type="number"
                      className="form-control"
                      value={trainingForm.kuota}
                      onChange={(e) =>
                        setTrainingForm({ ...trainingForm, kuota: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="btn btn-danger me-2">
                    {editTrainingId ? "Update" : "Simpan"}
                  </button>

                  {editTrainingId && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetTrainingForm}
                    >
                      Batal
                    </button>
                  )}
                </form>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="page-card admin-panel">
                <h4 className="panel-title">Daftar Training</h4>

                <div className="table-responsive">
                  <table className="table table-clean">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Tanggal</th>
                        <th>Tempat</th>
                        <th>Harga</th>
                        <th>Kuota</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainings.map((t) => (
                        <tr key={t.id}>
                          <td>{t.nama_training}</td>
                          <td>{t.tanggal}</td>
                          <td>{t.tempat}</td>
                          <td>Rp {Number(t.harga || 0).toLocaleString("id-ID")}</td>
                          <td>{t.kuota}</td>
                          <td>
                            <div className="d-flex flex-wrap gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setEditTrainingId(t.id);
                                  setTrainingForm({
                                    nama_training: t.nama_training || "",
                                    deskripsi: t.deskripsi || "",
                                    tanggal: t.tanggal || "",
                                    durasi: t.durasi || "",
                                    tempat: t.tempat || "",
                                    harga: t.harga || "",
                                    kuota: t.kuota || ""
                                  });
                                }}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteTraining(t.id)}
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {trainings.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            Belum ada data training.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && activeTab === "settings" && (
          <div className="page-card admin-panel">
            <h4 className="panel-title">Pengaturan Admin</h4>

            <form onSubmit={handleAdminProfileSubmit} style={{ maxWidth: "520px" }}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={adminForm.username}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password Baru</label>
                <input
                  type="password"
                  className="form-control"
                  value={adminForm.password}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, password: e.target.value })
                  }
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                />
              </div>

              <button type="submit" className="btn btn-danger">
                Simpan Perubahan
              </button>
            </form>
          </div>
        )}

        {!loading && activeTab === "feedback" && (
        <div className="page-card admin-panel">
          <h4 className="panel-title">Kelola Feedback</h4>

          <div className="table-responsive">
            <table className="table table-clean">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Pesan</th>
                  <th>Kesan</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.pesan}</td>
                    <td>{item.kesan}</td>
                    <td>{item.rating}</td>
                    <td>{item.status}</td>
                    <td>{item.is_featured ? "Ya" : "Tidak"}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            updateFeedback(item.id, "approved", item.is_featured)
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            updateFeedback(item.id, "rejected", false)
                          }
                        >
                          Reject
                        </button>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            updateFeedback(
                              item.id,
                              item.status === "approved" ? "approved" : "pending",
                              !item.is_featured
                            )
                          }
                        >
                          {item.is_featured ? "Unfeature" : "Feature"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {feedbacks.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Belum ada data feedback.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default AdminDashboard;