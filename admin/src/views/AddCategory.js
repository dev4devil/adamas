import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddCategory() {
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  // const [category, setCategory] = useState({
  //   name: "",
  //   description: "",
  //   image: "",
  //   status: true,
  // });
  // function handleChange(e) {
  //   if (e.target.name === "status") {
  //     setCategory((category) => ({
  //       ...category,
  //       [e.target.name]: e.target.checked,
  //     }));
  //   } else {
  //     setCategory((category) => ({
  //       ...category,
  //       [e.target.name]: e.target.value,
  //     }));
  //   }
  // }
  // const handleImage = (e) => {
  //   setCategory({ ...category, image: e.target.files[0] });
  // };
  function handleSubmit(e) {
    e.preventDefault();
    // console.log({ category });
    const formData = new FormData();
    formData.append("description", description);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("status", status);

    // axios
    //   .post("http://localhost:8000/api/category", formData, {
    //     "Content-Type": "multipart/form-data",
    //   })
    axios({
      method: "POST",
      url: "http://localhost:8000/api/category",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setAlert({ show: true, msg: res.data.message, variant: "success" });
        setName("");
        setImage("");
        setDescription("");
        setStatus(true);
        console.log(res);
      })
      .catch((err) => {
        setAlert({
          show: true,
          msg: "Error couldn't create category",
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
                <Card.Title as="h4">Add Category</Card.Title>
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
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          data={description}
                          onChange={(event, editor) => {
                            setDescription(editor.getData());
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
                            onChange={(e) => setImage(e.target.files[0])}
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
                      <Form.Group>
                        <label>Status</label>
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            id="custom-switch"
                            className="custom-control-input"
                            name="status"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
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

export default AddCategory;
