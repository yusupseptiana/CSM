import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TrainingDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/training/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h2>{data.nama_training}</h2>
      <p>{data.deskripsi}</p>
      <p>Tanggal: {data.tanggal}</p>
      <p>Kuota: {data.kuota}</p>

      <button className="btn btn-danger">
        Daftar Training
      </button>
    </div>
  );
}

export default TrainingDetail;