import React from "react";
import FormControl from "../../component/formcomponents/FormControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import usePost from "../../utilities/usePost";
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
// const technologyOptions = [
//   { label: "React JS", value: "React JS" },
//   { label: "React Native", value: "ReactNative" },
//   { label: "Dot Net", value: "Dot Net" },
//   { label: "QA", value: "QA" },
//   { label: "Front End", value: "Front End" },
//   { label: "Node JS", value: "Node JS" },
//   { label: "DevOps", value: "DevOps" },
//   { label: "PHP/Laravel", value: "PHP/Laravel" },
//   { label: "Support Engineer", value: "Support Engineer" },
// ];

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  mobileNumber: "",
  email: "",
  position: "",
  status: "",
  technology: "",
  expectedSalary: "",
  references: "",
  experience: "",
  // cv: null,
};

const validationSchema = Yup.object({
  // fullName: Yup.string()
  //   .required("Please enter the required field")
  //   .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  firstName: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  middleName: Yup.string().matches(
    /^[aA-zZ\s]+$/,
    "Only alphabets are allowed for this field "
  ),
  lastName: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid mobile number.")
    .required("Mobile number is required."),
  position: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  technology: Yup.string().required("Required"),
  // technology: Yup.array()
  //   .min(1, "Please select at least one option.")
  //   // .of(Yup.string(), "Invalid option selected.")
  //   .required("Please select at least one option."),
  expectedSalary: Yup.number()
    .typeError("Salary must be a number.")
    .positive("Salary must be a positive number.")
    .required("Salary is required."),
  references: Yup.string(),
  experience: Yup.string().required("required"),
  // cv: Yup.mixed().nullable().required("CV is required"),
});

const CreateApplicant = () => {
  const { postData } = usePost();
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
      id: uuidv4(),
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

    postData(
      `${process.env.REACT_APP_BASE_URL}/applicants`,
      data,
      "Applicant created Sucessfully"
    );
    // for multi select
    // let techno = [];
    // values.technology.map((a) => (techno = [a.value, ...techno]));
    // console.log(techno);
    // const data = {
    //   firstName: values.firstName,
    //   middleName: values.middleName,
    //   lastName: values.lastName,
    //   mobileNumber: values.mobileNumber,
    //   email: values.email,
    //   positionName: values.positionName,
    //   status: values.status,
    //   technology: techno,
    //   salary: values.salary,
    //   reference: values.reference,
    //   cv: values.cv,
    // };
    // console.log(data);
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
            <FormTopBar header="Create Applicant" />
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
              {/* <Col sm="4">
                <FormControl
                  control="input"
                  name="fullName"
                  type="text"
                  label="Full name"
                />
              </Col> */}
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
              {/* <Col sm="4">
                <FormControl
                  control="multi"
                  name="technology"
                  label="Select Technology"
                  options={technologyOptions}
                />
              </Col> */}
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

            {/* <Row className="mt-3">
              <Col sm="4">
                <FormControl
                  control="file"
                  name="cv"
                  onChange={(event) => {
                    setFieldValue("cv", event.target.files[0]);
                  }}
                  label="upload CV"
                  accept=".doc,.docx,.pdf"
                />
              </Col>
            </Row> */}

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

export default CreateApplicant;
