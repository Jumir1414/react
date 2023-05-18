import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import FormControl from "../../component/formcomponents/FormControl";

const levelOptions = [
  { key: "Junior", value: "Junior" },
  { key: "Mid", value: "Mid" },
  { key: "Senior", value: "Senior" },
];

const initialValues = {
  applicantID: "",
  companyName: "",
  fromDate: null,
  toDate: null,
  positionName: "",
  responsibilities: "",
  certificate: null,
};

const validationSchema = Yup.object({
  applicantID: Yup.string()
    .required("User ID is required")
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "Invalid GUID format"
    ),
  companyName: Yup.string().required("Company Name is Required"),
  fromDate: Yup.date().nullable().required("From date is Required"),
  toDate: Yup.date()
    .required("To date is required")
    .test(
      "is-greater",
      "To date must be greater than From date",
      function (value) {
        const { fromDate } = this.parent;
        return !fromDate || !value || new Date(value) > new Date(fromDate);
      }
    ),
  responsibilities: Yup.string().required("required"),
  certificate: Yup.mixed().nullable().required("Certificate is required"),
  positionName: Yup.string().required("Required"),
});

const CreateExperience = () => {
  // const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("hello", values);

    // navigate("..");
  };
  const maxDate = new Date();
  return (
    <Container className="mt-2" fluid>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FormTopBar header="Create Experience" />
            <Row className="mt-1">
              <Col sm="4">
                <FormControl
                  control="input"
                  name="applicantID"
                  label="Applicant ID"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col sm="4">
                <FormControl
                  control="input"
                  name="companyName"
                  label="Company Name"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="4">
                {/* <FormControl control="date" name="date" label="choose date" /> */}
                <FormControl
                  control="date"
                  name="fromDate"
                  label="From"
                  dateFormat="yyyy-MM-dd"
                  maxDate={maxDate}
                />
              </Col>
              <Col sm="4">
                <FormControl
                  control="date"
                  name="toDate"
                  label="To"
                  dateFormat="yyyy-MM-dd"
                  maxDate={maxDate}
                  minDate={values.fromDate}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <FormControl
                  control="radio"
                  name="positionName"
                  label="Choose Position"
                  options={levelOptions}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <FormControl
                  control="textarea"
                  name="responsibilities"
                  label="Responsibilities"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="4">
                <FormControl
                  control="file"
                  name="certificate"
                  onChange={(event) => {
                    setFieldValue("certificate", event.target.files[0]);
                  }}
                  label="upload Certificate"
                  accept=".jpeg,.jpg,.png,.pdf"
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

export default CreateExperience;
