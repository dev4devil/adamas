import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductLike from "./productLike";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { addToCart, refreshCart } from "../../actions/cartActions";
import { connect } from "react-redux";

function Product(props) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    msg: "",
    show: false,
    variant: "",
  });
  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [alert.show]);
  const auth = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: 0,
    category: "",
    qty: 0,
    status: true,
    featured: true,
  });
  useEffect(() => {
    if (localStorage.getItem("url") != undefined && auth.isAuthenticated) {
      const cart = {
        userId: auth.user.id,
        productId: id,
        qty: localStorage.getItem("qty"),
      };
      submitCart(cart);
    }
  }, []);
  const submitCart = (data) => {
    axios
      .post(`http://localhost:8000/api/cart/post`, data)
      .then((res) => {
        console.log("Added");
        setAlert({
          show: true,
          msg: res.data.message,
          variant: res.data.variant,
        });
        props.addToCart(res.data);
        console.log({ res });
      })
      .catch((res) => {
        console.log("Error couldn't");
        setAlert({
          show: true,
          msg: res.response.data.message,
          variant: "danger",
        });
        console.log({ res });
      });
  };
  const checkAuth = () => {
    // console.log(auth);
    if (product.qty >= quantity) {
      if (auth.isAuthenticated) {
        const cart = {
          userId: auth.user.id,
          productId: id,
          qty: quantity,
        };
        submitCart(cart);
      } else {
        localStorage.setItem("url", "/product/" + id);
        localStorage.setItem("qty", quantity);
        navigate("/login");
      }
    } else {
      setAlert({ show: true, msg: "Product is out of stock", variant: "info" });
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setProduct(...res.data);
      })
      .catch((err) => {
        console.log("Error couldn't fetch products");
        console.log(err.message);
      });
  }, [id]);
  useEffect(() => {
    console.log(product);
  }, [product]);
  return (
    <React.Fragment>
      <section className="product-details bg-light">
        <div className="container ">
          <div className="row d-flex justify-content-md-between">
            <div className="colo-sm-10 col-md-8">
              <div className="slider slider-for details-pic-div">
                <img
                  className="imgSet"
                  src={`http://localhost:8000/img/${product.image}`}
                  alt="img"
                />
              </div>
              <div className="slider slider-nav">
                {/* <Slider {...slideNav}>
                {detailedImages.map((dImg, i) => (
                  <div className="slick-slide slik-cloned" key={i}>
                    <img src={dImg.url} alt="" />
                  </div>
                ))}
              </Slider> */}
              </div>
              <div className="links">
                <ul>
                  <li>
                    <a href="/">DESCRIPTION</a>
                  </li>
                  <li>
                    <a href="/">ADDITIONAL INFORMATION</a>
                  </li>
                  <li>
                    <a href="/">REVIEWS (2)</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-10 col-md-4">
              <div className="ring-rating-div">
                <h5>{product.title}</h5>
                <ul>
                  <li>
                    <a href="/">
                      <span>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/">12 Reviews</a>
                  </li>
                  <li>
                    <a href="/">Add Your Review</a>
                  </li>
                </ul>
              </div>
              <div className="rating-div-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />
              </div>
              <div className="size-color-div">
                <div>
                  <label htmlFor="color">Color:</label>
                </div>
                <div>
                  <label htmlFor="Size">Size:</label>
                </div>
              </div>
              <div className="quantity-div">
                <ul>
                  <li>Qty:</li>
                  <li>
                    <div className="qty-div">
                      {quantity > 1 ? (
                        <i
                          className="fa fa-angle-left"
                          aria-hidden="true"
                          onClick={() => setQuantity(quantity - 1)}
                        ></i>
                      ) : (
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                      )}

                      <div className="qty-inp">
                        <p>{quantity}</p>
                      </div>
                      {quantity < product.qty ? (
                        <i
                          className="fa fa-angle-right"
                          aria-hidden="true"
                          onClick={() => setQuantity(quantity + 1)}
                        ></i>
                      ) : (
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      )}
                    </div>
                  </li>
                  <li>
                    <small>${product.price * quantity}</small>
                  </li>
                  <li>
                    <a onClick={(e) => checkAuth()}>Add TO CART</a>
                  </li>
                </ul>
              </div>
              <div className="rating-social-icons">
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
                </ul>
              </div>
            </div>
            <p className="p">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </p>
          </div>
        </div>
      </section>
      <ProductLike id={id} category={product.category} />
      <Alert show={alert.show} variant={alert.variant} transition={false}>
        {alert.msg}
      </Alert>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth, errors: state.errors, cart: state.cart };
}
export default connect(mapStateToProps, { addToCart, refreshCart })(Product);
