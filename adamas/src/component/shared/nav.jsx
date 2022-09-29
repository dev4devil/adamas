import React from "react";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <section className="navbar-section">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <strong>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </strong>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Link className="nav-link active" aria-current="page" to="/">
                <li className="nav-item">
                  Home
                  <i className="fa fa-angle-double-right"></i>
                </li>
              </Link>
              <Link className="nav-link" aria-current="page" to="/category">
                <li className="nav-item">
                  Apparel
                  <i className="fa fa-angle-double-right"></i>
                </li>
              </Link>
              <Link className="nav-link" aria-current="page" to="/product">
                <li className="nav-item">
                  fahion
                  <i className="fa fa-angle-double-right"></i>
                </li>
              </Link>
              <Link className="nav-link" aria-current="page" to="/contact">
                <li className="nav-item">
                  News
                  <i className="fa fa-angle-double-right"></i>
                </li>
              </Link>
              <Link className="nav-link" aria-current="page" to="/">
                <li className="nav-item">
                  Portfolio
                  <i className="fa fa-angle-double-right"></i>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
