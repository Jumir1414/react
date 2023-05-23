import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import FormControl from "../../component/formcomponents/FormControl";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import usePut from "../../utilities/usePut";
import useFetch from "../../utilities/useFetch";
const levelOptions = [
  { key: "Junior", value: "Junior" },
  { key: "Mid", value: "Mid" },
  { key: "Senior", value: "Senior" },
];

const validationSchema = Yup.object({
  interviewerName: Yup.string().required("Name is Required"),
  position: Yup.string().required("Required"),
});

const EditInterviewer = () => {
  const { id } = useParams();
  const { putData } = usePut();
  const { datas: data, loading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/interviewer/${id}`
  );
  const navigate = useNavigate();
  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  } else {
    const initialValues = {
      interviewerName: data.interviewerName,
      position: data.position,
    };

    const onSubmit = (values) => {
      putData(
        `${process.env.REACT_APP_BASE_URL}/interviewer/`,
        id,
        values,
        "Applicant Edited Sucessfully"
      );
      navigate("..");
    };
    return (
      <Container className="mt-2" fluid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <FormTopBar header="Create Interviewer" />
              <Row className="mt-2">
                <Col sm="4">
                  <FormControl
                    control="input"
                    name="interviewerName"
                    label="Interviewer Name"
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <FormControl
                    control="radio"
                    name="position"
                    label="Choose Position"
                    options={levelOptions}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col sm="1">
                  <div className="text-center">
                    <Button type="submit">Edit</Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
};

export default EditInterviewer;
