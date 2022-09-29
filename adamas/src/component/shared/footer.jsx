import React from "react";
import ring from "../../images/ring.jpg";
import redRing from "../../images/red-ring.jpg";
import logo from "../../images/logo.png";

function Footer() {
  return (
    <footer className="footer bg-light">
      <div className="container">
        <div className="row">
          <div className="colo-sm-10 col-md-3">
            <div className="footer-logo">
              <strong>
                <a href="/">
                  <img src={logo} alt="" />
                </a>
              </strong>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consec tetuer adipiscing elit, sed
              diam non ummy nibh euismod tincidunt ut lao reet dolore magna
              aliquam erat volutpat.
            </p>
          </div>
          <div className="col-sm-10 col-md-3">
            <div>
              <h6>Recent Products</h6>
            </div>
            <ul>
              <li>
                <a href="/">
                  <div className="">
                    <img src={ring} alt="" />
                  </div>
                  <div className="footer-text">
                    <p>Blue Sky Diamond</p>
                    <span>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span>
                    <b>$1520.0</b>
                  </div>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/">
                  <div className="">
                    <img src={redRing} alt="" />
                  </div>
                  <div className="footer-text">
                    <p>Fiery red Ring</p>
                    <span>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span>
                    <b>$1520.0</b>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-10 col-md-3">
            <div>
              <h6>Contacts</h6>
            </div>
            <ul className="">
              <li>
                <a href="/">Adamas d.o.o., 1000 Ljubljana</a>
              </li>
              <li>
                <a href="/">Celovska cesta 135</a>
              </li>
              <li>
                <a href="/">Slovenia, Europe</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/">Phone: (+386) 40 123 456</a>
              </li>
              <li>
                <a href="/">Mobile: (+386) 40 654 123 651</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/" className="info">
                  Email: info@premiumcoding.com{" "}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-10 col-md-3">
            <div>
              <h6>SignIn to Newsletter</h6>
            </div>
            <div>
              <form>
                <div className="inputs-div">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="inputs-div">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <button className="">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
