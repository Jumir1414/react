import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";

import FormControl from "../../component/formcomponents/FormControl";
const initialValues = {
  applicantId: "",
  interviewerId: "",
  dateTime: null,
};

const validationSchema = Yup.object({
  applicantId: Yup.string()
    .required("User ID is required")
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "Invalid GUID format"
    ),
  interviewerId: Yup.string()
    .required("Interviewer ID is required")
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "Invalid GUID format"
    ),
  dateTime: Yup.date().nullable().required(" Date and Time is Required"),
});
const CreateInterview = () => {
  // const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("hello", values);

    // navigate("..");
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
            <FormTopBar header="Create Interview" />
            <Row className="mt-2">
              <Col sm="4">
                <FormControl
                  control="input"
                  name="applicantId"
                  label="Applicant ID"
                />
              </Col>
              <Col sm="4">
                <FormControl
                  control="input"
                  name="interviewerId"
                  label="InterviewerId"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="4">
                <FormControl
                  control="date"
                  name="dateTime"
                  label="Date And Time"
                  showTimeSelect
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col sm="1">
                <div className="text-center">
                  <Button type="submit">Submit</Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateInterview;
