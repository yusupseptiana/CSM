import React from "react";
import { Link } from "react-router-dom";
import csmlogo from "../assets/partners/csm-logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={csmlogo}
          alt="CSM Logo"
          style={{ height: "150px", width: "150px", objectFit: "contain", marginRight: "5px" }}
        />
        {/* <span>CSM Training</span> */}
      </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Beranda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Pendaftaran</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/admin/login">Admin</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;