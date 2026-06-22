import React from "react";
import { Link } from "react-router-dom";
import csmlogo from "../assets/csm-logo.png";

function Navbar() {
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeNavbar}>
          <img
            src={csmlogo}
            alt="CSM Logo"
            className="navbar-logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Beranda
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="programDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                Program
              </a>

              <ul className="dropdown-menu" aria-labelledby="programDropdown">
                <li>
                  <Link className="dropdown-item" to="/program/training" onClick={closeNavbar}>
                    Training
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/program/consulting" onClick={closeNavbar}>
                    Consulting
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/program/education" onClick={closeNavbar}>
                    Education
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register" onClick={closeNavbar}>
                Pendaftaran
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;