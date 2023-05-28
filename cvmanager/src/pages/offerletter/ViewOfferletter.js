import React from "react";
import useFetch from "../../utilities/useFetch";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrorMsg from "../../component/ErrorMsg";
const ViewOfferletter = () => {
  const { id } = useParams();
  const { datas, loading, error } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/offerletter/${id}`
  );
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
    console.log(datas);
    return (
      <Container>
        <Row className="mt-3">
          <FormTopBar header="Offer letter Details" />
        </Row>
        <Row className="mt-3">
          <Col>
            <h5>
              <span className="dataLabel">Name:</span> {datas.applicantName}
            </h5>
            <h5>
              <span className="dataLabel">Remark:</span> {datas.remark}
            </h5>
          </Col>
        </Row>
        <Row>
          <Col className="p-2 m-3" sm="9" style={{ background: "white" }}>
            <label>
              <span className="dataLabel">Offer Letter</span>{" "}
            </label>
            <ReactQuill
              value={datas.textEditor}
              readOnly={true}
              theme={"bubble"}
            />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ViewOfferletter;
