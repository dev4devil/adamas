import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Products({ products }) {
  const auth = useSelector((state) => state.auth);
  const subscribe = () => {
    const user = {
      name: auth.user.name,
      email: auth.user.email,
    };
    // axios
    //   .post(`http://localhost:8000/api/subscribe`, user)
    //   .then((res) => console.log(res))
    //   .catch((res) => console.log(res));
  };
  return (
    <div className="row gy-4 justify-content-md-between justify-content-sm-between">
      {/* <div className="card" key={0}>
        <div className="catagory-imgs">
          <img
            className="card-img-top"
            src={`http://localhost:8000/img/1f763e37-6c2b-43f1-9098-1b6a8a0ecfc3-1662701976529.jpg`}
            alt="img"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">Subscription Card</h5>
          <p className="card-text">Easyload of 1000</p>
          <b>$1000</b>
          <a onClick={() => subscribe()} className="btn btn-primary">
            Subscribe Now
          </a>
        </div>
        <div className="catagory-icons">
          <p>
            <i className="fa fa-sliders"></i>
            Subscription
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
      </div> */}
      {products.map((prod, i) => (
        <div className="card" key={i} style={{ width: "18rem" }}>
          <div className="catagory-imgs">
            <img
              className="card-img-top"
              src={`http://localhost:8000/img/${prod.image}`}
              alt="img"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{prod.title}</h5>
            <div
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: prod.description,
              }}
            />
            <b>${prod.price}</b>
            <Link to={"/product/" + prod._id} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
          <div className="catagory-icons">
            <p>
              <i className="fa fa-sliders"></i>
              {prod.categoryName}
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
    </div>
  );
}

export default Products;
