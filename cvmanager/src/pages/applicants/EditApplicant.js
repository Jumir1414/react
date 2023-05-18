import React, { useEffect, useState } from "react";
import FormControl from "../../component/formcomponents/FormControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
const levelOptions = [
  { key: "Junior", value: "Junior" },
  { key: "Mid", value: "Mid" },
  { key: "Senior", value: "Senior" },
];

const statusOptions = [
  { key: "Select Status", value: "" },
  { key: "Shortlisted ", value: "Shortlisted" },
  { key: "Interviewing", value: "Interviewing" },
  { key: "Offered", value: "Offered" },
  { key: "Hired", value: "Hired" },
  { key: "Rejected", value: "Rejected" },
  { key: "Blacklisted", value: "Blacklisted" },
];
const technologyOptions = [
  { key: "Select technology", value: "" },
  { key: "React Native", value: "ReactNative" },
  { key: "Front End", value: "Front End" },
  { key: "QA", value: "QA" },
  { key: "Dot Net", value: "Dot Net" },
  { key: "React JS", value: "React JS" },
  { key: "DevOps", value: "DevOps" },
  { key: "PHP/Laravel", value: "PHP/Laravel" },
  { key: "Support Engineer", value: "Support Engineer" },
  { key: "Node JS", value: "Node JS" },
];

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid mobile number.")
    .required("Mobile number is required."),
  position: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  technology: Yup.string().required("Required"),
  expectedSalary: Yup.number()
    .typeError("Salary must be a number.")
    .positive("Salary must be a positive number.")
    .required("Salary is required."),
  references: Yup.string(),
});

const EditApplicant = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/applicants/` + id
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

  const initialValues = {
    fullName: data.fullName,
    mobileNumber: data.mobileNumber,
    email: data.email,
    position: data.position,
    status: data.status,
    technology: data.technology,
    expectedSalary: data.expectedSalary,
    references: data.references,
  };
  const navigate = useNavigate();
  const onSubmit = (values) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/applicants/` + id, values)
      .then((res) => {
        alert("Applicant Edited Sucessfully");
      });
    navigate("..");
  };
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <FormTopBar header="Edit Applicant" />
              <Row className="mt-1">
                <Col sm="4">
                  <FormControl
                    control="input"
                    name="fullName"
                    type="text"
                    label="Full name"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col sm="4">
                  <FormControl
                    control="input"
                    name="mobileNumber"
                    type="text"
                    label="Mobile Number"
                  />
                </Col>

                <Col sm="4">
                  <FormControl
                    control="input"
                    name="email"
                    type="text"
                    label="Email"
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm="4">
                  <FormControl
                    control="select"
                    name="status"
                    label="Status"
                    options={statusOptions}
                  />
                </Col>
                <Col sm="4">
                  <FormControl
                    control="select"
                    name="technology"
                    label="Technology"
                    options={technologyOptions}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <FormControl
                    control="radio"
                    name="position"
                    label="Choose Level"
                    options={levelOptions}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm="4">
                  <FormControl
                    control="input"
                    name="expectedSalary"
                    type="text"
                    label="Expected salary"
                  />
                </Col>
                <Col sm="4">
                  <FormControl
                    control="input"
                    name="references"
                    type="text"
                    label="Reference"
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col sm="1">
                  <div className="text-center">
                    <Button type="submit">Update</Button>
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

export default EditApplicant;
