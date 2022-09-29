import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
// react-bootstrap components
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";

function Users() {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user`)
      .then((res) => {
        console.log(res.data);
        setUsers([...res.data]);
      })
      .catch((err) => {
        console.log("Error couldn't fetch users");
        console.log(err.message);
      });
  }, []);
  const del = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Once deleted can not be recovered",
      buttons: [
        {
          label: "Confirm",
          onClick: () => {
            axios
              .delete(`http://localhost:8000/api/user/${id}`)
              .then((deleted) => {
                console.log("Deleted User", deleted);
              });
            setUsers((data) => {
              return data.filter((users) => users._id !== id);
            });
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="df-sb">
                <Card.Title as="h4">Users</Card.Title>
                <Link to="/admin/adduser">
                  <Button variant="success">Add User</Button>
                </Link>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.firstName + " " + user.lastName}</td>
                          <td>{user.role}</td>
                          <td>
                            {moment(user.createdAt).format("DD MMM YYYY LT")}
                          </td>
                          <td>{user.status == true ? "Active" : "Inactive"}</td>
                          <td>
                            <Link to={"/admin/updateuser/" + user._id}>
                              <Button
                                className="mr-2"
                                variant="outline-primary"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </Link>
                            <Button
                              variant="outline-danger"
                              onClick={() => del(user._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
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

export default Users;
