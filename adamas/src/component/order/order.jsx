import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function Order() {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState();
  const [status, setStatus] = useState("all");
  useEffect(() => {
    console.log("ORders: ", orders);
  }, [orders]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order/${auth.user.id}`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log("Error couldn't fetch your orders");
        console.log(err.message);
      });
  }, [auth.user.id]);
  return (
    <>
      <div className="container mb-5">
        <h3>My Orders</h3>
      </div>
      <div className="container">
        <div className="card cw">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a
                  className={status === "all" ? "nav-link active" : "nav-link"}
                  onClick={() => setStatus("all")}
                >
                  All
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    status === "processing" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setStatus("processing")}
                >
                  Processing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    status === "shipped" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setStatus("shipped")}
                >
                  Shipped
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    status === "delivered" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setStatus("delivered")}
                >
                  Delivered
                </a>
              </li>
            </ul>
          </div>
          {orders &&
            orders.map((o, i) =>
              o.status == status && status != "all" ? (
                <div className="card bg-smoke m-5" key={i}>
                  <div className="card-header">
                    <h4 className="mb-3">Order # {o._id}</h4>
                    <p className="m-0">
                      Placed On: {moment(o.updatedAt).format("DD MMM YYYY LT")}
                    </p>
                    <p className="m-0">Status: {o.status}</p>
                  </div>
                  {o.cartdatas.map(
                    (cart, index) => (
                      console.log("cart", cart),
                      (
                        <div className="card-body" key={index}>
                          <div className="media align-items-center">
                            <img
                              src={`http://localhost:8000/img/${cart.products[0].image}`}
                              className="d-block ui-w-270 ui-bordered"
                              alt=""
                            />
                            <div className="media-body">
                              <div>{cart.products[0].title}</div>
                              <div>
                                <small>
                                  <span className="text-muted">Qty:</span>{" "}
                                  {cart.qty}
                                  <span className="ui-product-color ui-product-color-sm align-text-bottom bcol1"></span>{" "}
                                  &nbsp;
                                  <span className="text-muted">Price: </span> $
                                  {o.amount}
                                  &nbsp;
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              ) : status === "all" ? (
                <div className="card bg-smoke m-5" key={i}>
                  <div className="card-header">
                    <h4 className="mb-3">Order # {o._id}</h4>
                    <p className="m-0">
                      Placed On: {moment(o.updatedAt).format("DD MMM YYYY LT")}
                    </p>
                    <p className="m-0">Status: {o.status}</p>
                  </div>
                  {o.cartdatas.map(
                    (cart, index) => (
                      console.log("cart", cart),
                      (
                        <div className="card-body" key={index}>
                          <div className="media align-items-center">
                            <img
                              src={`http://localhost:8000/img/${cart.products[0].image}`}
                              className="d-block ui-w-270 ui-bordered"
                              alt=""
                            />
                            <div className="media-body">
                              <div>{cart.products[0].title}</div>
                              <div>
                                <small>
                                  <span className="text-muted">Qty:</span>{" "}
                                  {cart.qty}
                                  <span className="ui-product-color ui-product-color-sm align-text-bottom bcol1"></span>{" "}
                                  &nbsp;
                                  <span className="text-muted">Price: </span> $
                                  {o.amount}
                                  &nbsp;
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </>
  );
}

export default Order;
