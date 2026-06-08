import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TrainingList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/training`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container py-5">
      <h2>Daftar Training</h2>

      {Array.isArray(data) ? data.map(item => (
        <div key={item.id || item.id_training} className="card p-3 mb-3">
          <h4>{item.nama_training}</h4>
          <p>{item.deskripsi}</p>

          <Link to={`/training/${item.id_training}`}>
            <button className="btn btn-dark">Detail</button>
          </Link>
        </div>
      )) : null}
    </div>
  );
}

export default TrainingList;