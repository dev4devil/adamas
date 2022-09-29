import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useParams } from "react-router";
import moment from "moment";
import { Alert, Card, Nav, Container, Row, Col } from "react-bootstrap";

function Orders() {
  const { id } = useParams();
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
  //   const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState();
  const [status, setStatus] = useState("all");

  useEffect(() => {
    refresh();
  }, []);
  const refresh = () => {
    axios
      .get(`http://localhost:8000/api/order/`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log("Error couldn't fetch your orders");
        console.log(err.message);
      });
  };
  const changeStatus = (id, sta) => {
    confirmAlert({
      title: "Confirm to update the status to " + sta,
      message: "",
      buttons: [
        {
          label: "Confirm",
          onClick: () => {
            axios
              .put(`http://localhost:8000/api/order/${id}/${sta}`)
              .then((res) => {
                setAlert({
                  show: true,
                  msg: res.data.message,
                  variant: "success",
                });
                refresh();
                console.log(res.data.message);
              })
              .catch((err) => {
                setAlert({
                  show: true,
                  msg: "Error couldn't update order",
                  variant: "danger",
                });
                console.log(err.message);
              });
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  useEffect(() => {
    if (id != undefined && orders != undefined)
      document.getElementById(id).scrollIntoView();
  }, [id, orders]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="df-sb">
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link
                      className={status == "all" ? "active" : ""}
                      onClick={() => setStatus("all")}
                    >
                      All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={status === "processing" ? "active" : ""}
                      onClick={() => setStatus("processing")}
                    >
                      Processing
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={status === "shipped" ? "active" : ""}
                      onClick={() => setStatus("shipped")}
                    >
                      Shipped
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={status === "delivered" ? "active" : ""}
                      onClick={() => setStatus("delivered")}
                    >
                      Delivered
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {orders &&
                  orders.map((o, i) =>
                    o.status == status && status != "all" ? (
                      <div className="card bg-smoke m-5" key={i}>
                        <div className="card-header">
                          <h4 className="mb-3">Order # {o._id}</h4>
                          <p className="m-0">
                            Placed On:{" "}
                            {moment(o.updatedAt).format("DD MMM YYYY LT")}
                          </p>
                          <p className="m-0">Status: {o.status}</p>
                          Set status to{" "}
                          <select
                            size="sm"
                            onChange={(e) => {
                              if (o.status != e.target.value)
                                changeStatus(o._id, e.target.value);
                            }}
                          >
                            <option>---</option>
                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="delivered">delivered</option>
                          </select>
                        </div>
                        {o.cartdatas.map((cart, index) => (
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
                                    <span className="text-muted">
                                      Price:{" "}
                                    </span>{" "}
                                    ${o.amount}
                                    &nbsp;
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : status === "all" ? (
                      <div className="card bg-smoke m-5" key={i} id={o._id}>
                        <div className="card-header">
                          <h4 className="mb-3">Order # {o._id}</h4>
                          <p className="m-0">
                            Placed On:{" "}
                            {moment(o.updatedAt).format("DD MMM YYYY LT")}
                          </p>
                          <p className="m-0">Status: {o.status}</p>
                        </div>
                        {o.cartdatas.map((cart, index) => (
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
                                    <span className="text-muted">
                                      Price:{" "}
                                    </span>{" "}
                                    ${o.amount}
                                    &nbsp;
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )
                  )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Alert show={alert.show} variant={alert.variant} transition={false}>
        {alert.msg}
      </Alert>
    </>
  );
}

export default Orders;
