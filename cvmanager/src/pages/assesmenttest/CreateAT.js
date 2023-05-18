import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import FormControl from "../../component/formcomponents/FormControl";
const initialValues = {
  applicantID: "",
  title: "",
  evaluation: "",
  document: null,
};

const validationSchema = Yup.object({
  applicantID: Yup.string()
    .required("User ID is required")
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "Invalid GUID format"
    ),
  title: Yup.string().required("Title is required"),
  evaluation: Yup.string(),
  document: Yup.mixed().nullable().required("Document is required"),
});

const CreateAT = () => {
  // const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("data", values);

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
            <FormTopBar header="Create Applicant Test" />
            <Row className="mt-1">
              <Col sm="4">
                <FormControl
                  control="input"
                  name="applicantID"
                  label="Applicant ID"
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col sm="4">
                <FormControl control="input" name="title" label="Title" />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col sm="5">
                <FormControl
                  control="input"
                  name="evaluation"
                  label="Evaluation"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm="4">
                <FormControl
                  control="file"
                  name="document"
                  onChange={(event) => {
                    setFieldValue("document", event.target.files[0]);
                  }}
                  label="upload Document"
                  accept=".doc,.docx,.pdf"
                />
              </Col>
            </Row>
            <Row className="mt-2">
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

export default CreateAT;
