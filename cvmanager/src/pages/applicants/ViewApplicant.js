import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Status from "../../component/Status";
import useFetch from "../../utilities/useFetch";
const ViewApplicant = () => {
  const { id } = useParams();
  const { datas, loading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/applicants/${id}`
  );

  const { datas: assessmentTestDatas, loading: loading2 } = useFetch(
    "http://localhost:3000/assesmentTest"
  );

  if (loading || loading2) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  } else {
    console.log(assessmentTestDatas);
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
              <Card.Header as="h5">{datas.fullName}</Card.Header>
              <Card.Body>
                <Card.Title>
                  <span>Technology: {datas.technology}</span>
                </Card.Title>
                <Card.Text>Applied Position: {datas.position}</Card.Text>
                <Card.Text>
                  Expected Salary: Rs {datas.expectedSalary}
                </Card.Text>
                <Card.Text>Reference: {datas.references}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="4" className="text-center">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5">Personal Details </Card.Header>
              <Card.Body>
                <Card.Title>
                  <span>Name :{datas.fullName}</span>
                </Card.Title>
                <Card.Text>Email: {datas.email}</Card.Text>
                <Card.Text>Phone :{datas.mobileNumber}</Card.Text>
                <Card.Text>Address: </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="4" className="text-center">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5">Experience</Card.Header>
              <Card.Body>
                <Card.Text>{datas.experience}</Card.Text>
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
                <Status data={datas.status} />
              </Card.Body>
            </Card>
          </Col>
          <Col className="text-center" sm="6">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5" style={{ width: "100%" }}>
                Assessment Test
              </Card.Header>
              <Card.Body>
                <Card.Text>{assessmentTestDatas[0].title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ViewApplicant;
