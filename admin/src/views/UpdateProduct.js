import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function UpdateProduct() {
  const { id } = useParams();
  const [check, setCheck] = useState(false);
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
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    qty: 1,
    price: 1,
    category: "",
    status: true,
    featured: true,
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/category/get-category/${"fetchcat"}`)
      .then((res) => {
        console.log(res.data);
        setCategories([...res.data]);
        // console.log("cat:", categories);
      })
      .catch((err) => {
        console.log("Error couldn't fetch categories");
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setProduct(...res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error couldn't get product");
        console.log(err.message);
      });
  }, []);
  function handleChange(e) {
    if (e.target.name === "status" || e.target.name === "featured") {
      setProduct((product) => ({
        ...product,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setProduct((product) => ({
        ...product,
        [e.target.name]: e.target.value,
      }));
    }
  }
  const handleImage = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log({ product });
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("image", product.image);
    formData.append("qty", product.qty);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("status", product.status);
    formData.append("featured", product.featured);
    axios({
      method: "PUT",
      url: `http://localhost:8000/api/product/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setAlert({ show: true, msg: res.data.message, variant: "success" });
        console.log(res);
      })
      .catch((err) => {
        setAlert({
          show: true,
          msg: "Error couldn't update product",
          variant: "danger",
        });
        console.log(err);
      });
  }
  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Update Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          placeholder="Title"
                          type="text"
                          name="title"
                          value={product.title}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={product.description}
                          // onReady={(editor) => {
                          //   // You can store the "editor" and use when it is needed.
                          //   // console.log("Editor is ready to use!", editor);
                          // }}
                          onChange={(event, editor) => {
                            if (check) {
                              setProduct({
                                ...product,
                                description: editor.getData(),
                              });
                            } else {
                              setCheck(true);
                            }
                            // console.log({ event, editor, data });
                          }}
                          // onBlur={(event, editor) => {
                          //   console.log("Blur.", editor);
                          // }}
                          // onFocus={(event, editor) => {
                          //   console.log("Focus.", editor);
                          // }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <div className="custom custom-file">
                          <input
                            type="file"
                            id="custom-file"
                            accept=".jpg, .png, .jpeg"
                            className="custom-file-input"
                            name="image"
                            onChange={handleImage}
                          />
                          <Form.Label
                            htmlFor="custom-file"
                            className="custom-file-label"
                          >
                            Choose Image
                          </Form.Label>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          name="qty"
                          value={product.qty}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <img
                        style={{ height: 200 }}
                        src={`http://localhost:8000/img/${product.image}`}
                        alt="img"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          placeholder="Price"
                          type="number"
                          name="price"
                          value={product.price}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          as="select"
                          name="category"
                          value={product.category}
                          onChange={handleChange}
                        >
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            id="statusswitch"
                            className="custom-control-input"
                            name="status"
                            checked={product.status}
                            onChange={handleChange}
                          />
                          <label
                            title=""
                            htmlFor="statusswitch"
                            className="custom-control-label"
                          ></label>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Featured</Form.Label>
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            id="featuredswitch"
                            className="custom-control-input"
                            name="featured"
                            checked={product.featured}
                            onChange={handleChange}
                          />
                          <label
                            title=""
                            htmlFor="featuredswitch"
                            className="custom-control-label"
                          ></label>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="df-sb">
                      <Link to="/admin/product">
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
          <Col></Col>
        </Row>
      </Container>
      <Alert show={alert.show} variant={alert.variant} transition={false}>
        {alert.msg}
      </Alert>
    </>
  );
}

export default UpdateProduct;
