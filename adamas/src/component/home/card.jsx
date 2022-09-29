import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Card() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    console.log({ category });
  }, [category]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/category/active/${"3"}`)
      .then((res) => {
        setCategory([...res.data]);
      })
      .catch((err) => {
        console.log("Error couldn't update category");
        console.log(err.message);
      });
  }, []);
  return (
    <section className="cards-section">
      <div className="container">
        <div className="row justify-content-lg-between ">
          {category.map((cat, index) => (
            <div className="col-sm-10 col-md-4 center" key={index}>
              <div className="card-img-div">
                <img
                  className="cat-image"
                  src={`http://localhost:8000/img/${cat.image}`}
                  alt="img"
                />
              </div>
              <h2>{cat.name}</h2>
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: cat.description,
                  }}
                />
              </p>
              <Link to={"/category/" + cat._id}>Visit Store</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Card;
