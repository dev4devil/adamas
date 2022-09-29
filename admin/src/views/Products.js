import React, { useState, useEffect } from "react";
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

function Products() {
  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   console.log("products", products);
  // }, [products]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product`)
      .then((res) => {
        console.log(res.data);
        setProducts([...res.data]);
        // console.log("product:", product);
      })
      .catch((err) => {
        console.log("Error couldn't fetch products");
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
              .delete(`http://localhost:8000/api/product/${id}`)
              .then((deletedProduct) => {
                console.log("Deleted Product", deletedProduct);
              });
            setProduct((data) => {
              return data.filter((products) => products._id !== id);
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
                <Card.Title as="h4">Products</Card.Title>
                <Link to="/admin/addproduct">
                  <Button variant="success">Add Product</Button>
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
                      <th className="border-0">Title</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Featured</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.title}</td>
                          <td>{product.qty}</td>
                          <td>{product.price}</td>
                          <td>
                            {product.featured == true ? "Active" : "Inactive"}
                          </td>
                          <td>
                            {product.status == true ? "Active" : "Inactive"}
                          </td>
                          <td>
                            {moment(product.createAt).format("DD MMM YYYY LT")}
                          </td>
                          <td>
                            <Link to={"updateproduct/" + product._id}>
                              <Button
                                className="mr-2"
                                variant="outline-primary"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </Link>
                            <Button
                              variant="outline-danger"
                              onClick={() => del(product._id)}
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

export default Products;
