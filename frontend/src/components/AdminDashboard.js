import React, { useEffect, useState, useCallback } from "react"; // Tambahkan useCallback
import axios from "axios";
import apiPath from "../api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("registrations");
  const [registrations, setRegistrations] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainingForm, setTrainingForm] = useState({
    nama_training: "", deskripsi: "", tanggal: "", durasi: "", tempat: "", harga: "", kuota: ""
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Bungkus dengan useCallback
  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await axios.get(apiPath('/admin/registrations'), { withCredentials: true });
      const rdata = res.data;
      setRegistrations(Array.isArray(rdata) ? rdata : (rdata?.data || []));
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [navigate]);

  // Bungkus dengan useCallback
  const fetchTrainings = useCallback(async () => {
    try {
      const res = await axios.get(apiPath('/admin/trainings'), { withCredentials: true });
      const tdata = res.data;
      setTrainings(Array.isArray(tdata) ? tdata : (tdata?.data || []));
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [navigate]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(apiPath(`/admin/registrations/${id}/status`), { status }, { withCredentials: true });
      fetchRegistrations();
    } catch (err) {
      alert("Gagal update status");
    }
  };

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(apiPath(`/admin/trainings/${editId}`), trainingForm, { withCredentials: true });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/trainings`, trainingForm, { withCredentials: true });
      }
      setTrainingForm({ nama_training: "", deskripsi: "", tanggal: "", durasi: "", tempat: "", harga: "", kuota: "" });
      setEditId(null);
      fetchTrainings();
    } catch (err) {
      alert("Gagal simpan training");
    }
  };

  const deleteTraining = async (id) => {
    if (window.confirm("Yakin hapus training ini?")) {
      try {
        await axios.delete(apiPath(`/admin/trainings/${id}`), { withCredentials: true });
        fetchTrainings();
      } catch (err) {
        alert("Gagal hapus training");
      }
    }
  };

  const logout = async () => {
    await axios.post(apiPath('/admin/logout'), {}, { withCredentials: true });
    navigate("/admin/login");
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (activeTab === "registrations") await fetchRegistrations();
      else await fetchTrainings();
      setLoading(false);
    };
    loadData();
  }, [activeTab, fetchRegistrations, fetchTrainings]);

  return (
    <div className="container-fluid py-4" style={{ background: "linear-gradient(135deg, #ff003c, #ff002f)", minHeight: "100vh" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white">Admin Dashboard</h2>
          <button onClick={logout} className="btn btn-light">Logout</button>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "registrations" ? "active" : ""}`} onClick={() => setActiveTab("registrations")}>
              Daftar Pendaftar
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "trainings" ? "active" : ""}`} onClick={() => setActiveTab("trainings")}>
              Kelola Training
            </button>
          </li>
        </ul>

        {loading && <div className="text-white text-center">Loading...</div>}

        {activeTab === "registrations" && (
          <div className="glass p-4">
            <h4 className="text-white mb-3">Semua Pendaftaran</h4>
            <div className="table-responsive">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Training</th>
                    <th>Tanggal Training</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(registrations) ? registrations.map(reg => (
                    <tr key={reg.id || reg.id_registration}>
                      <td>{reg.nama}</td>
                      <td>{reg.email}</td>
                      <td>{reg.nama_training}</td>
                      <td>{reg.tanggal}</td>
                      <td>
                        <span className={`badge bg-${reg.status === 'confirmed' ? 'success' : reg.status === 'cancelled' ? 'danger' : 'warning'}`}>
                          {reg.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={reg.status}
                          onChange={(e) => updateStatus(reg.id, e.target.value)}
                          style={{ width: "130px" }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  )) : null}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "trainings" && (
          <div>
            <div className="glass p-4 mb-4">
              <h4 className="text-white mb-3">{editId ? "Edit Training" : "Tambah Training Baru"}</h4>
              <form onSubmit={handleTrainingSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Nama Training" value={trainingForm.nama_training}
                      onChange={(e) => setTrainingForm({ ...trainingForm, nama_training: e.target.value })} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="date" className="form-control" value={trainingForm.tanggal}
                      onChange={(e) => setTrainingForm({ ...trainingForm, tanggal: e.target.value })} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Durasi (contoh: 2 hari)" value={trainingForm.durasi}
                      onChange={(e) => setTrainingForm({ ...trainingForm, durasi: e.target.value })} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Tempat" value={trainingForm.tempat}
                      onChange={(e) => setTrainingForm({ ...trainingForm, tempat: e.target.value })} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="number" className="form-control" placeholder="Harga" value={trainingForm.harga}
                      onChange={(e) => setTrainingForm({ ...trainingForm, harga: e.target.value })} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="number" className="form-control" placeholder="Kuota" value={trainingForm.kuota}
                      onChange={(e) => setTrainingForm({ ...trainingForm, kuota: e.target.value })} />
                  </div>
                  <div className="col-12 mb-3">
                    <textarea className="form-control" rows="2" placeholder="Deskripsi" value={trainingForm.deskripsi}
                      onChange={(e) => setTrainingForm({ ...trainingForm, deskripsi: e.target.value })}></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-light me-2">{editId ? "Update" : "Simpan"}</button>
                    {editId && <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setTrainingForm({ nama_training: "", deskripsi: "", tanggal: "", durasi: "", tempat: "", harga: "", kuota: "" }); }}>Batal</button>}
                  </div>
                </div>
              </form>
            </div>

            <div className="glass p-4">
              <h4 className="text-white mb-3">Daftar Training</h4>
              <div className="table-responsive">
                <table className="table table-dark">
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
                    {Array.isArray(trainings) ? trainings.map(t => (
                      <tr key={t.id || t.id_training}>
                        <td>{t.nama_training}</td>
                        <td>{t.tanggal}</td>
                        <td>{t.tempat}</td>
                        <td>Rp {t.harga?.toLocaleString()}</td>
                        <td>{t.kuota}</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => {
                            setEditId(t.id || t.id_training);
                            setTrainingForm({
                              nama_training: t.nama_training,
                              deskripsi: t.deskripsi,
                              tanggal: t.tanggal,
                              durasi: t.durasi,
                              tempat: t.tempat,
                              harga: t.harga,
                              kuota: t.kuota
                            });
                          }}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteTraining(t.id || t.id_training)}>Hapus</button>
                        </td>
                      </tr>
                    )) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;