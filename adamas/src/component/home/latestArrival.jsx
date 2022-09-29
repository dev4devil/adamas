import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function Arrival() {
  const [arrival, setArrival] = useState([]);
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  useEffect(() => {
    console.log({ arrival });
  }, [arrival]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shared/latest-arrival`)
      .then((res) => {
        setArrival([...res.data.data]);
        console.log("RES: ", res.data.data);
      })
      .catch((err) => {
        console.log("Error couldn't fetch latest products");
        console.log(err.message);
      });
  }, []);
  return (
    <section className="latus-arrival">
      <div className="container">
        <div className="row justify-content-lg-center align-items-center text-center">
          <div className="col-sm-10 col-md-6">
            <h3>OUR LATEST ARRIVALS</h3>
            <span></span>
            <small></small>
            <span></span>
            <p>
              Check our latest offers that just arrived to the store. New{" "}
              <span className="non">Nonummy</span> for you to wear.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-between justify-content-sm-between">
          <Slider {...setting}>
            {arrival.map((la, index) => (
              <div className="card imp" key={index}>
                <div className="catagory-imgs">
                  <img
                    src={`http://localhost:8000/img/${la.image}`}
                    alt="img"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{la.title}</h5>
                  <p className="card-text">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: la.description,
                      }}
                    />
                  </p>
                  <b>${la.price}</b>
                  <Link to={"/product/" + la._id} className="btn btn-primary">
                    Buy Now
                  </Link>
                </div>
                <div className="catagory-icons">
                  <p>
                    <i className="fa fa-sliders"></i>
                    {la.categoryName}
                  </p>
                  <ul>
                    <li>
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Arrival;
