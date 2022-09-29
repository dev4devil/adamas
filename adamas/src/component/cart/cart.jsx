import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { addToCart } from "../../actions/cartActions";
import { connect } from "react-redux";
import Checkout from "../checkout/checkout";

function Cart(props) {
  const auth = useSelector((state) => state.auth);
  const [cartUI, setCartUI] = useState(true);
  const [checkOutUI, setCheckOutUI] = useState(false);
  const [bill, setBill] = useState();
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState();
  const [alert, setAlert] = useState({
    msg: "",
    show: false,
    variant: "",
  });
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${auth.user.id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log("Error couldn't fetch User details");
        console.log(err.message);
      });
  }, [auth.user.id]);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [alert.show]);

  useEffect(() => {
    updatedCart();
  }, [auth.user.id]);

  const updatedCart = () => {
    axios
      .get(`http://localhost:8000/api/cart/${auth.user.id}`)
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => {
        console.log("Error couldn't fetch your cart");
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (user) {
      setBill({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        address: {
          city: user.city,
          line1: user.address,
        },
        amount: total.toFixed(2),
      });
    }
  }, [user, total]);

  useEffect(() => {
    if (cart) {
      let sum = cart.reduce(function (prev, current) {
        return prev + +current.qty * current.productPrice;
      }, 0);
      console.log(sum);
      setTotal(sum);
      console.log("Total", total);
      console.log(cart);
    }
  }, [cart, total]);

  const updateQty = (updateCart) => {
    axios
      .put(`http://localhost:8000/api/cart/`, updateCart)
      .then((res) => {
        setAlert({
          show: true,
          msg: res.data.message,
          variant: res.data.variant,
        });
        console.log({ res });
        updatedCart();
      })
      .catch((err) => {
        setAlert({
          show: true,
          msg: "Error couldn't update user",
          variant: "danger",
        });
        console.log({ err });
      });
  };

  const minusQty = (qty, cId, pId) => {
    if (qty - 1 > 0) {
      console.log(qty, "I am hit");
      const updateCart = {
        id: cId,
        cartId: cart[0].cartId,
        productId: pId,
        qty: qty - 1,
      };
      updateQty(updateCart);
    } else {
      setAlert({
        show: true,
        msg: "Product quantity can not be 0",
        variant: "danger",
      });
      console.log(qty, "Dont do this");
    }
  };

  const plusQty = (qty, cId, pId, stock) => {
    if (qty + 1 <= stock) {
      const updateCart = {
        id: cId,
        cartId: cart[0].cartId,
        productId: pId,
        qty: qty + 1,
      };
      updateQty(updateCart);
      console.log("We are good");
    } else
      setAlert({
        show: true,
        msg: "Can not increase quantity further",
        variant: "info",
      });
  };
  const deleteCart = (id) => {
    axios.delete(`http://localhost:8000/api/cart/${id}`).then((deleted) => {
      setAlert({ show: true, msg: deleted.data.message, variant: "success" });
      console.log({ deleted });
      props.addToCart(deleted.data);
      updatedCart();
    });
  };
  const changeUI = () => {
    setCartUI(false);
    setCheckOutUI(true);
  };
  useEffect(() => {
    console.log("Bill to: ", bill);
  }, [bill]);
  return (
    <section className="">
      <div
        className="container px-3 my-5 clearfix"
        style={{ display: cartUI ? "block" : "none" }}
      >
        <div className="card cw">
          <div className="card-header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    <th className="text-center">Product Name &amp; Details</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.map((c, i) => (
                      <tr key={i}>
                        <td className="">
                          <div className="media align-items-center">
                            <img
                              src={`http://localhost:8000/img/${c.productImage}`}
                              className="d-block ui-w-40 ui-bordered"
                              alt=""
                            />
                            <div className="media-body">
                              <div>{c.productTitle}</div>
                              <div>
                                <small>
                                  <span className="text-muted">Color:</span>
                                  <span className="ui-product-color ui-product-color-sm align-text-bottom bcol1"></span>{" "}
                                  &nbsp;
                                  <span className="text-muted">
                                    Storage:{" "}
                                  </span>{" "}
                                  32GB &nbsp;
                                  <span className="text-muted">
                                    Warranty:{" "}
                                  </span>{" "}
                                  Standard - 1 year &nbsp;
                                  <span className="text-muted">
                                    Ships from:{" "}
                                  </span>{" "}
                                  China
                                </small>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          ${c.productPrice}
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          <span
                            className="text-danger fw-bold cur"
                            onClick={() => minusQty(c.qty, c._id, c.productId)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          {c.qty}
                          <span
                            className="text-success fw-bold cur"
                            onClick={() =>
                              plusQty(c.qty, c._id, c.productId, c.productQty)
                            }
                          >
                            {" "}
                            +
                          </span>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          ${c.productPrice * c.qty}
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteCart(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-end m-4">
              <div className="text-large">
                Total price :<strong> ${total}</strong>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-end m-4">
              <button
                type="button"
                className="btn btn-lg btn-primary mt-2"
                onClick={() => changeUI()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {checkOutUI ? <Checkout cart={cart} bill={bill} /> : ""}

      <Alert show={alert.show} variant={alert.variant} transition={false}>
        {alert.msg}
      </Alert>
    </section>
  );
}

function mapStateToProps(state) {
  return { cart: state.cart };
}
export default connect(mapStateToProps, { addToCart })(Cart);
