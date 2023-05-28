import React from "react";
import FormControl from "../../component/formcomponents/FormControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import usePut from "../../utilities/usePut";
import useFetch from "../../utilities/useFetch";
import ErrorMsg from "../../component/ErrorMsg";
const levelOptions = [
  { key: "Intern", value: "Intern" },
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
  { key: "ReactJS", value: "ReactJS" },
  { key: "ReactNative", value: "ReactNative" },
  { key: "DotNet", value: "DotNet" },
  { key: "QA", value: "QA" },
  { key: "Frontend", value: "Frontend" },
  { key: "NodeJS", value: "NodeJS" },
  { key: "DevOps", value: "DevOps" },
  { key: "PHP/Laravel", value: "PHP/Laravel" },
  { key: "Support Engineer", value: "SupportEngineer" },
];

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  middleName: Yup.string().matches(
    /^[aA-zZ\s]+$/,
    "Only alphabets are allowed for this field "
  ),
  lastName: Yup.string()
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
  experience: Yup.string().required("required"),
});

const EditApplicant = () => {
  const { id } = useParams();
  const { putData } = usePut();
  const {
    datas: data,
    loading,
    error,
    refetch,
  } = useFetch(`${process.env.REACT_APP_BASE_URL}/applicants/${id}`);
  function splitFullName(fullName) {
    if (!fullName) {
      return [];
    }

    var nameParts = fullName.trim().split(/\s+/);

    var firstName = nameParts.shift();
    var lastName = nameParts.pop();
    var middleName = nameParts.join(" ");

    return [firstName, middleName, lastName];
  }
  let fullName = data.fullName;
  let nameparts = splitFullName(fullName);

  const initialValues = {
    firstName: nameparts[0],
    middleName: nameparts[1],
    lastName: nameparts[2],
    mobileNumber: data.mobileNumber,
    email: data.email,
    position: data.position,
    status: data.status,
    technology: data.technology,
    experience: data.experience,
    expectedSalary: data.expectedSalary,
    references: data.references,
  };
  const navigate = useNavigate();
  const onSubmit = (values) => {
    let fullName = "";
    if (values.middleName === "") {
      fullName = values.firstName + " " + values.lastName;
    } else {
      fullName =
        values.firstName + " " + values.middleName + " " + values.lastName;
    }
    let data = {
      fullName: fullName,
      email: values.email,
      mobileNumber: values.mobileNumber,
      status: values.status,
      technology: values.technology,
      position: values.position,
      experience: values.experience,
      expectedSalary: values.expectedSalary,
      references: values.references,
    };
    putData(
      `${process.env.REACT_APP_BASE_URL}/applicants/`,
      id,
      data,
      "Applicant Edited Sucessfully"
    );
    navigate(-1);
  };
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
    return (
      <div>
        <ErrorMsg msg={error.message} />
        <div className="text-center">
          <button onClick={refetch} className="btn btn-primary ">
            Reload
          </button>
        </div>
      </div>
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
                <Col>
                  <FormControl
                    control="input"
                    name="firstName"
                    type="text"
                    label="First Name"
                  />
                </Col>

                <Col>
                  <FormControl
                    control="input"
                    name="middleName"
                    type="text"
                    label="Middle Name"
                  />
                </Col>

                <Col>
                  <FormControl
                    control="input"
                    name="lastName"
                    type="text"
                    label="Last Name"
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
                <Col>
                  <FormControl
                    control="textarea"
                    name="experience"
                    label="Experience"
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
