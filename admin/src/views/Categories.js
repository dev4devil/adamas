import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import { Link } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/category`)
      .then((res) => {
        console.log(res.data);
        setCategories([...res.data]);
        // console.log("product:", product);
      })
      .catch((err) => {
        console.log("Error couldn't fetch categories");
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
              .delete(`http://localhost:8000/api/category/${id}`)
              .then((deleted) => {
                console.log("Deleted Category", deleted);
              });
            setCategories((data) => {
              return data.filter((categories) => categories._id !== id);
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
                <Card.Title as="h4">Categories</Card.Title>
                <Link to="/admin/addcategory">
                  <Button variant="success">Add Category</Button>
                </Link>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{category.name}</td>
                          <td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: category.description,
                              }}
                            />
                          </td>
                          <td>
                            {moment(category.createAt).format("DD MMM YYYY LT")}
                          </td>
                          <td>
                            {category.status == true ? "Active" : "Inactive"}
                          </td>
                          <td>
                            <Link to={"updatecategory/" + category._id}>
                              <Button
                                className="mr-2"
                                variant="outline-primary"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </Link>
                            <Button
                              variant="outline-danger"
                              onClick={() => del(category._id)}
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

export default Categories;
