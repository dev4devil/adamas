import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function ProductLike({ id, category }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    console.log({ productList });
  }, [productList]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shared/getProducts/${category}`)
      .then((res) => {
        setProductList(() => {
          return res.data.data.filter((productList) => productList._id !== id);
        });
      })
      .catch((err) => {
        console.log("Error couldn't fetch products");
        console.log(err.message);
      });
  }, [category, id]);
  return (
    <section className="like-products">
      <div className="container">
        <div className="row lazy justify-content-md-between justify-content-sm-between">
          <Slider {...settings}>
            {productList.map((pl, i) => (
              <div className="card imp" key={i}>
                <Link to={"/product/" + pl._id}>
                  <div className="catagory-imgs">
                    <img
                      src={`http://localhost:8000/img/${pl.image}`}
                      alt="img"
                      className="card-img-top"
                    />
                  </div>
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{pl.title}</h5>
                  <p className="card-text">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pl.description,
                      }}
                    />
                  </p>
                </div>
                <div className="catagory-icons">
                  <p>
                    <i className="fa fa-sliders"></i>
                    {pl.categoryName}
                  </p>
                  <ul>
                    <li>
                      <i className="fa fa-star"></i>
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

export default ProductLike;
