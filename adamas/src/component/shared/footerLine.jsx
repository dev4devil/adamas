import React from "react";

function FooterLine() {
  return (
    <div className="footer-bottom">
      <div className="container align-items-center">
        <div className="row justify-content-sm-between justify-content-md-between align-items-center">
          <div className="col-sm-10 col-md-6">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">SiteMap</a>
              </li>
              <li>
                <a href="/">Portfolio</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-10 col-md-6">
            <p>Adamas @2022 All rights reserved | By Arhamsoft</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterLine;
