import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";

function UpdateCategory() {
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
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: "",
    status: true,
  });
  useEffect(() => {
    console.log({ category });
  }, [category]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/category/${id}`)
      .then((res) => {
        setCategory(...res.data);
      })
      .catch((err) => {
        console.log("Error couldn't update category");
        console.log(err.message);
      });
  }, []);
  function handleChange(e) {
    if (e.target.name === "status") {
      setCategory((category) => ({
        ...category,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setCategory((category) => ({
        ...category,
        [e.target.name]: e.target.value,
      }));
    }
  }
  const handleImage = (e) => {
    setCategory({ ...category, image: e.target.files[0] });
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log({ category });
    const formData = new FormData();
    formData.append("description", category.description);
    formData.append("name", category.name);
    formData.append("image", category.image);
    formData.append("status", category.status);
    axios({
      method: "PUT",
      url: `http://localhost:8000/api/category/${id}`,
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
          msg: "Error couldn't update category",
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
            <Card className="p-4">
              <Card.Header>
                <Card.Title as="h4">Update Category</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name"
                          type="text"
                          name="name"
                          defaultValue={category.name}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Description</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={category.description}
                          onReady={(editor) => {
                            // editor.setData("Loading");
                          }}
                          onChange={(event, editor) => {
                            // const data = editor.getData();
                            if (check) {
                              setCategory({
                                ...category,
                                description: editor.getData(),
                              });
                            } else {
                              setCheck(true);
                            }
                            // console.log({ event, editor, data });
                          }}
                          onBlur={(event, editor) => {
                            console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            console.log("Focus.", editor);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <div className="custom custom-file">
                          <input
                            type="file"
                            id="custom-file"
                            accept=".jpg, .png, .jpeg"
                            className="custom-file-input"
                            name="image"
                            onChange={handleImage}
                          />
                          <label
                            htmlFor="custom-file"
                            className="custom-file-label"
                          >
                            Choose Image
                          </label>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <img
                        style={{ height: 200 }}
                        src={`http://localhost:8000/img/${category.image}`}
                        alt="img"
                      />
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
                            checked={category.status}
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
                      <Link to="/admin/category">
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

export default UpdateCategory;
