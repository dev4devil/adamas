import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// react-bootstrap components
import {
  Alert,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Fade,
} from "react-bootstrap";

function AddUser() {
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
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    country: "",
    role: "",
    status: true,
  });
  function handleChange(e) {
    if (e.target.name === "status") {
      setUser((user) => ({ ...user, [e.target.name]: e.target.checked }));
    } else {
      setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log({ user });
    axios
      .post("http://localhost:8000/api/user", user)
      .then((res) => {
        setAlert({ show: true, msg: res.data.message, variant: "success" });
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address: "",
          city: "",
          country: "",
          role: "",
          status: true,
        });
        console.log(res.data.message);
      })
      .catch((err) => {
        setAlert({
          show: true,
          msg: "Error couldn't create user",
          variant: "danger",
        });
        console.log(err.message);
      });
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="p-4">
              <Card.Header>
                <Card.Title as="h4">Add User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          placeholder="Enter First Name"
                          type="text"
                          name="firstName"
                          value={user.firstName}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          placeholder="Enter Last Name"
                          type="text"
                          name="lastName"
                          value={user.lastName}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          placeholder="Enter Email"
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Enter Password"
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          placeholder="Enter Address"
                          type="text"
                          name="address"
                          value={user.address}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          placeholder="Enter City"
                          type="text"
                          name="city"
                          value={user.city}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          placeholder="Enter Country"
                          type="text"
                          name="country"
                          value={user.country}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Role</label>
                        <Form.Control
                          as="select"
                          name="role"
                          value={user.role}
                          onChange={handleChange}
                        >
                          <option value="customer">Customer</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Status</label>
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            id="custom-switch"
                            className="custom-control-input"
                            name="status"
                            checked={user.status}
                            onChange={handleChange}
                          />
                          <label
                            title=""
                            htmlFor="custom-switch"
                            className="custom-control-label"
                          ></label>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="df-sb">
                      <Link to="/admin/user">
                        <Button variant="outline-secondary">Back</Button>
                      </Link>
                      <Button type="submit" variant="success">
                        Save
                      </Button>
                    </Col>
                  </Row>

                  <div className="clearfix"></div>
                </Form>
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

export default AddUser;
