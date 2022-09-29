import React from "react";

function CategorySlide() {
  return (
    <section className="slide-bar">
      <div className="container">
        <div className="row justify-content-lg-between align-items-center">
          <div className="col-sm- col-md-6">
            <h1>Shop with a Sidebar On Left</h1>
            <div className="slide-bar-heading">
              <ul>
                <li>
                  <a href="/">
                    Home <i className="fa fa-angle-double-right"></i>
                  </a>
                </li>
                <li>
                  <a href="/">Shop with a sidebar</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-10 col-md-6 flex">
            <div>
              <a href="/">
                <i className="fa fa-mobile" aria-hidden="true"></i>
              </a>
            </div>
            <div>
              <ul>
                <li>
                  <h2>+565 975 658</h2>
                </li>
                <li>
                  <p>Monday - Friday, 8.00-20.00</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategorySlide;
