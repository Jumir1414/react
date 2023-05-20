import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import Status from "../../component/Status";
const ViewApplicant = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/applicants/` + id
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  } else {
    return (
      <Container className="mt-2" fluid>
        <Row>
          <Col>
            <FormTopBar header="Applicant's Details" />
          </Col>
          <Col className="d-flex justify-content-end">
            <Link
              to={`../editapplicant/${id}`}
              className="btn btn-sm d-flex align-items-center btn-success"
            >
              Edit
            </Link>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm="4" className="text-center">
            <Card>
              <Card.Header as="h5">{data.fullName}</Card.Header>
              <Card.Body>
                <Card.Title>
                  <span>Technology: {data.technology}</span>
                </Card.Title>
                <Card.Text>Applied Position: {data.position}</Card.Text>
                <Card.Text>Expected Salary: Rs {data.expectedSalary}</Card.Text>
                <Card.Text>Reference: {data.references}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="4" className="text-center">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5">Personal Details </Card.Header>
              <Card.Body>
                <Card.Title>
                  <span>Name :{data.fullName}</span>
                </Card.Title>
                <Card.Text>Email: {data.email}</Card.Text>
                <Card.Text>Phone :{data.mobileNumber}</Card.Text>
                <Card.Text>Address: </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="4" className="text-center">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5">Experience</Card.Header>
              <Card.Body>
                <Card.Text>{data.experience}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2 ">
          <Col className="text-center" sm="6">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5" style={{ width: "100%" }}>
                Status{" "}
              </Card.Header>
              <Card.Body>
                <Status data={data.status} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ViewApplicant;
