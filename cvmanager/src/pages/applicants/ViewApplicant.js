import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
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

  const { datas: interviewDatas, loading: loading3 } = useFetch(
    "http://localhost:3000/interview"
  );

  if (loading || loading2 || loading3) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  } else {
    let assessmentTestData = [];
    assessmentTestDatas.forEach((data) => {
      if (id === data.applicantId) {
        return (assessmentTestData = [...assessmentTestData, data]);
      }
    });
    let num = assessmentTestData.length;
    let applicantInterview = [];
    interviewDatas.forEach((interviewData) => {
      interviewData.applicants.forEach((applicant) => {
        if (id === applicant.value) {
          return (applicantInterview = [
            ...applicantInterview,
            {
              title: interviewData.title,
              date: interviewData.date,
              id: interviewData.id,
            },
          ]);
        }
      });
    });
    console.log(applicantInterview);
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
              <Card.Header as="h5" style={{ width: "100%" }}>
                {datas.fullName}
              </Card.Header>
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
          <Col sm="6" className="text-center">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5" style={{ width: "100%" }}>
                Personal Details{" "}
              </Card.Header>
              <Card.Body style={{ width: "100%" }}>
                <Card.Title>
                  <span>Name :{datas.fullName}</span>
                </Card.Title>
                <Card.Text>Email: {datas.email}</Card.Text>
                <Card.Text>Phone :{datas.mobileNumber}</Card.Text>
                <Card.Text>Experience:{datas.experience} </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 ">
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
              <ListGroup variant="flush">
                {num === 0 ? (
                  <div className="mt-5">Empty</div>
                ) : (
                  assessmentTestData.map((test) => (
                    <ListGroup.Item
                      key={test.id}
                      className="d-flex justify-content-around "
                    >
                      <div>Title : {test.title}</div>
                      <div>Evaluation : {test.evaluation}</div>
                      <Link
                        to={`../../assesmenttest/editat/${test.id}`}
                        className="btn btn-sm ms-1 btn-success"
                      >
                        Edit
                      </Link>
                    </ListGroup.Item>
                  ))
                )}
                <div className="mt-1 mb-1">
                  <Link
                    to="../../assesmenttest/createat"
                    className="btn  ms-1 btn-secondary"
                  >
                    create
                  </Link>
                </div>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col className="text-center" sm="6">
            <Card style={{ height: "100%" }}>
              <Card.Header as="h5" style={{ width: "100%" }}>
                Interview
              </Card.Header>
              <ListGroup variant="flush">
                {applicantInterview.length === 0 ? (
                  <div className="mt-5">Not schedule </div>
                ) : (
                  applicantInterview.map((interview) => (
                    <ListGroup.Item
                      key={interview.id}
                      className="d-flex justify-content-around "
                    >
                      <div>Title : {interview.title}</div>
                      <div>
                        <Link
                          to={`../../interview/editinterview/${interview.id}`}
                          className="btn btn-sm ms-1 btn-success"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`../../interview/viewinterview/${interview.id}`}
                          className="btn btn-sm ms-1 btn-success"
                        >
                          View
                        </Link>
                      </div>
                    </ListGroup.Item>
                  ))
                )}
                <div className="mt-1 mb-1">
                  <Link
                    to="../../interview/createinterview"
                    className="btn  ms-1 btn-secondary"
                  >
                    create
                  </Link>
                </div>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ViewApplicant;
