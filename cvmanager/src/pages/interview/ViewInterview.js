import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../../utilities/useFetch";
import { Link } from "react-router-dom";
import ErrorMsg from "../../component/ErrorMsg";
import moment from "moment/moment";
const ViewInterview = () => {
  const { id } = useParams();
  const {
    datas: data,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_BASE_URL}/interview/${id}`);

  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }
  if (error) {
    return <ErrorMsg msg={error.message} />;
  } else {
    const time = moment(data.date).format("hh:mm a");
    const date = moment(data.date).format("DD/MM/YYYY");

    return (
      <Container className="mt-2" fluid>
        <Row>
          <Col>
            <FormTopBar header="Interview Details" />
          </Col>
          <Col className="d-flex justify-content-end">
            <Link
              to={`../editinterview/${id}`}
              className="btn btn-sm d-flex align-items-center btn-success"
            >
              Edit
            </Link>
          </Col>
        </Row>

        <Row className="mt-2">
          <Card>
            <Card.Body style={{ width: "100%" }}>
              <Row style={{ width: "100%" }}>
                <Card.Title>
                  <span className="dataLabel">Interview Title :</span>{" "}
                  {data.title.toUpperCase()}
                </Card.Title>
              </Row>
              <Row className="mt-2" style={{ width: "100%" }}>
                <Card.Title>
                  <span className="dataLabel">Date :</span> {date}
                </Card.Title>
              </Row>
              <Row className="mt-2" style={{ width: "100%" }}>
                <Card.Title>
                  <span className="dataLabel">Time :</span> {time}
                </Card.Title>
              </Row>
              <Row className="mt-2" style={{ width: "100%" }}>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Header className="text-center ">
                      <h5>Total Applicants {data.applicants.length}</h5>
                    </Card.Header>
                    <ListGroup variant="flush">
                      {data.applicants.map((applicant) => (
                        <ListGroup.Item key={applicant.value}>
                          {applicant.label}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Header className="text-center ">
                      <h5>Interviewer's No - {data.interviewers.length}</h5>
                    </Card.Header>
                    <ListGroup variant="flush">
                      {data.interviewers.map((interview) => (
                        <ListGroup.Item key={interview.value}>
                          {interview.label}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
};

export default ViewInterview;
