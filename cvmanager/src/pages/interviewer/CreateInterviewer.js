import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import FormControl from "../../component/formcomponents/FormControl";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const levelOptions = [
  { key: "Junior", value: "Junior" },
  { key: "Mid", value: "Mid" },
  { key: "Senior", value: "Senior" },
];

const initialValues = {
  interviewerName: "",
  position: "",
};

const validationSchema = Yup.object({
  interviewerName: Yup.string().required("Name is Required"),
  position: Yup.string().required("Required"),
});

const postData = async (data) => {
  try {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/interviewer`, data)
      .then((res) => {
        alert("Interviewer created Sucessfully");
      });
  } catch (error) {
    console.log(error);
  }
};

const CreateInterviewer = () => {
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const data = {
      id: uuidv4(),
      interviewerName: values.interviewerName,
      position: values.position,
    };

    postData(data);
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

export default CreateInterviewer;
