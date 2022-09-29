import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
// react-bootstrap components
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";

function Payment() {
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/payment`)
      .then((res) => {
        console.log(res.data);
        setPayment([...res.data]);
      })
      .catch((err) => {
        console.log("Error couldn't fetch Payments");
        console.log(err.message);
      });
  }, []);
  // const del = (id) => {
  //   confirmAlert({
  //     title: "Confirm to Delete",
  //     message: "Once deleted can not be recovered",
  //     buttons: [
  //       {
  //         label: "Confirm",
  //         onClick: () => {
  //           axios
  //             .delete(`http://localhost:8000/api/user/${id}`)
  //             .then((deleted) => {
  //               console.log("Deleted User", deleted);
  //             });
  //           setUsers((data) => {
  //             return data.filter((users) => users._id !== id);
  //           });
  //         },
  //       },
  //       {
  //         label: "Cancel",
  //       },
  //     ],
  //   });
  // };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="df-sb">
                <Card.Title as="h4">Payments</Card.Title>
                {/* <Link to="/admin/adduser">
                  <Button variant="success">Add User</Button>
                </Link> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Order #</th>
                      <th className="border-0">Payment #</th>
                      <th className="border-0">Amount</th>
                      <th className="border-0">Paid on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment.map((p, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={"/admin/order/" + p.cartId}>
                              {p.cartId}
                            </Link>
                          </td>
                          <td>{p.stripePaymentId}</td>
                          <td>${p.amount}</td>
                          <td>
                            {moment(p.createdAt).format("DD MMM YYYY LT")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Payment;
