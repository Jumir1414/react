import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import FormControl from "../../component/formcomponents/FormControl";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import usePut from "../../utilities/usePut";
import useFetch from "../../utilities/useFetch";
const validationSchema = Yup.object({
  applicant: Yup.array()
    .max(1, "Please select only one option.")
    // .of(Yup.string(), "Invalid option selected.")
    .required("Please select at least one option."),
  evaluation: Yup.string(),
  // document: Yup.mixed().nullable().required("Document is required"),
});
const EditAT = () => {
  const { id } = useParams();
  const { putData } = usePut();
  const { datas: data, loading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/assesmentTest/${id}`
  );
  const { datas: applicants, loading: loading2 } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/applicants`
  );
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const assessmentData = {
      applicantName: values.applicant[0].label,
      applicantId: values.applicant[0].value,
      title: values.title,
      evaluation: values.evaluation,
    };
    putData(
      `${process.env.REACT_APP_BASE_URL}/assesmentTest/`,
      id,
      assessmentData,
      "Assessment Test Edited Sucessfully"
    );
    navigate("..");
  };
  if (loading || loading2) {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 ">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  } else {
    let applicantOptions = [];
    applicants.map((applicant) => {
      return (applicantOptions = [
        ...applicantOptions,
        {
          label: applicant.fullName,
          value: applicant.id,
        },
      ]);
    });

    const initialValues = {
      applicant: [
        {
          label: data.applicantName,
          value: data.applicantId,
        },
      ],
      title: data.title,
      evaluation: data.evaluation,
      // document: null,
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
              <FormTopBar header="Edit Assessment Test" />
              <Row className="mt-1">
                <Col sm="4">
                  <FormControl
                    control="multi"
                    name="applicant"
                    label="Choose only one Applicant"
                    options={applicantOptions}
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
              {/* <Row className="mt-2">
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
            </Row> */}
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
  }
};

export default EditAT;
