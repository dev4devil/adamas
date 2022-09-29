import React from "react";

function Social() {
  return (
    <section className="socail-section">
      <div className="container">
        <div className="row d-flex align-items-center ">
          <div className="col-sm-10 col-md-6 social-icons-left">
            <span>
              {" "}
              <i className="fa fa-twitter"></i>
            </span>
            <p>
              Revenant was just released on #themeforest{" "}
              <span className="lin">http://bit.ly/qoXj6m</span>
            </p>
          </div>
          <div className="col-sm-10 col-md-6 social-icons-right">
            <p>Check the latest news on our Social Networks:</p>
            <ul>
              <li>
                <a href="/">
                  <i className="fa fa-wifi"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  {" "}
                  <i className="fa fa-pinterest-square"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  {" "}
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  {" "}
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fa fa-futbol-o" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Social;
