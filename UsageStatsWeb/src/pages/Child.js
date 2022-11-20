import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import app from "../base";
import { DashboardLayout } from "../components/Layout";

const database = app.database();
var user = app.auth().currentUser;

const Children = () => {
  const history = useHistory();
  var databaseref = database.ref();
  const email = app.auth().currentUser.email;
  const username = email.split("@")[0];
  const [childData, setChildData] = useState([]);
  useEffect(() => {
    let ref = databaseref.child("users").child(username).child("children");
    ref.on("value", (snapshot) => {
      let elements = [];

      const data = snapshot.val();
      //   console.log(data);

      snapshot.forEach((child) => {
        elements.push({ id: child.key, ...child.val() });
      });

      setChildData(elements);
    });

    return () => {};
  }, []);

  const [childFormData, setChildFormData] = useState({
    name: "",
    uid: "",
    skey: "",
    AppDetails: [],
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e, type) => {
    setChildFormData({ ...childFormData, [type]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(childFormData);
    console.log(user);

    databaseref
      .child("users")
      .child(username)
      .child("children")
      .child(childFormData.uid)
      .set(childFormData)
      .then((res) => alert("Child Added"))
      .catch((err) => alert("Error Ocurred"));

    setChildFormData({
      name: "",
      uid: "",
      skey: "",
      AppDetails: [],
    });
    setShow(false);
  };
  const AddChildModal = (second) => {
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Child</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={childFormData.name}
                  onChange={(e) => handleChange(e, "name")}
                  placeholder="Child Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Unique ID</Form.Label>
                <Form.Control
                  type="text"
                  value={childFormData.uid}
                  onChange={(e) => handleChange(e, "uid")}
                  placeholder="Unique ID"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Secret Key</Form.Label>
                <Form.Control
                  type="password"
                  value={childFormData.skey}
                  onChange={(e) => handleChange(e, "skey")}
                  placeholder="Secret Key"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <DashboardLayout>
      {AddChildModal()}
      <div className=" p-10 d-flex justify-content-end">
        <Button onClick={handleShow}>Add Child </Button>
      </div>
      <Row xs={1} md={2} className="g-4 p-10">
        {childData.map((item, idx) => (
          <Col key={idx}>
            <Card>
              {console.log(item)}
              <Card.Body>
                <Card.Title>Name:{item.name}</Card.Title>
                <Card.Text>UID:{item.uid}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button onClick={() => history.push(`child-info/${item.uid}`)}>
                  View Details
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </DashboardLayout>
  );
};

export default Children;
