import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function Featured() {
  const [featured, setFeatured] = useState([]);
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  useEffect(() => {
    console.log({ featured });
  }, [featured]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shared/featured`)
      .then((res) => {
        setFeatured([...res.data.data]);
        console.log("RES: ", res.data.data);
      })
      .catch((err) => {
        console.log("Error couldn't fetch featured products");
        console.log(err.message);
      });
  }, []);
  return (
    <section className="latus-arrival">
      <div className="container">
        <div className="row justify-content-lg-center align-items-center text-center">
          <div className="col-sm-10 col-md-6">
            <h3>Our Featured Products</h3>
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
        <div className="row lazy justify-content-md-between justify-content-sm-between">
          <Slider {...setting}>
            {featured.map((feature, i) => (
              <div className="card imp" key={i}>
                <div className="catagory-imgs">
                  <img
                    src={`http://localhost:8000/img/${feature.image}`}
                    alt="img"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: feature.description,
                      }}
                    />
                  </p>
                  <b>${feature.price}</b>

                  <Link
                    to={"/product/" + feature._id}
                    className="btn btn-primary"
                  >
                    Buy Now
                  </Link>
                </div>
                <div className="catagory-icons">
                  <p>
                    <i className="fa fa-sliders"></i>
                    {feature.categoryName}
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
          {/* <div className="card">
            <div className="catagory-imgs">
              <img src={arrival2} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <h5 className="card-title">Blue Sky Diamond</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem ipsum
                dolor adipiscing elit edam itis.{" "}
              </p>
              <b>$25.89</b>
              <a href="/" className="btn btn-primary">
                Buy Now
              </a>
            </div>
            <div className="catagory-icons">
              <p>
                <i className="fa fa-sliders"></i>Catagory
              </p>
              <ul>
                <li>
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </li>
              </ul>
            </div>
          </div> */}
          {/* <div className="card">
            <div className="catagory-imgs">
              <img src={arrival3} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <h5 className="card-title">A Black Leather Purse</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem ipsum
                dolor adipiscing elit edam itis.{" "}
              </p>
              <b>$25.89</b>
              <a href="/" className="btn btn-primary">
                Buy Now
              </a>
            </div>
            <div className="catagory-icons">
              <p>
                <i className="fa fa-sliders"></i>Catagory
              </p>
              <ul>
                <li>
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </li>
              </ul>
            </div>
          </div> */}
          {/* <div className="card">
            <div className="catagory-imgs">
              <img src={arrival4} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <h5 className="card-title">Silver Ring with Blue diamond</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem ipsum
                dolor adipiscing elit edam itis.{" "}
              </p>
              <b>$25.89</b>
              <a href="/" className="btn btn-primary">
                Buy Now
              </a>
            </div>
            <div className="catagory-icons">
              <p>
                <i className="fa fa-sliders"></i>Catagory
              </p>
              <ul>
                <li>
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Featured;
