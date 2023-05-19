import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const ViewInterview = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/interview/` + id
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
                  Interview Title : {data.title.toUpperCase()}
                </Card.Title>
              </Row>
              <Row className="mt-2" style={{ width: "100%" }}>
                <Card.Title>Date and time : {data.date}</Card.Title>
              </Row>
              <Row className="mt-2" style={{ width: "100%" }}>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Header className="text-center ">
                      <h5>Applicant's No - {data.applicants.length}</h5>
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
