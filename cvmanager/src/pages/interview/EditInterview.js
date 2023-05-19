import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import axios from "axios";
import FormControl from "../../component/formcomponents/FormControl";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditInterview = () => {
  const [applicants, setApplicants] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    dateTime: Yup.date().nullable().required(" Date and Time is Required"),
    applicants: Yup.array()
      .min(1, "Please select at least one option.")
      // .of(Yup.string(), "Invalid option selected.")
      .required("Please select at least one option."),
    interviewers: Yup.array()
      .min(1, "Please select at least one option.")
      // .of(Yup.string(), "Invalid option selected.")
      .required("Please select at least one option."),
  });
  const getData = async () => {
    try {
      const response1 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/applicantsList`
      );
      const response2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/interviewerList`
      );
      const response3 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/interview/` + id
      );
      setApplicants(response1.data);
      setInterviewers(response2.data);
      setData(response3.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  const putData = async (data) => {
    try {
      await axios
        .put(`${process.env.REACT_APP_BASE_URL}/interview/` + id, data)
        .then((res) => {
          alert("Interview Edited Sucessfully");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (values) => {
    const date = moment(values.dateTime).format("YYYY-MM-DD HH:mm");

    const data = {
      title: values.title,
      date: date,
      interviewers: values.interviewers,
      applicants: values.applicants,
    };
    putData(data);
    navigate("..");
    console.log(data);
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
    const initialValues = {
      title: data.title,
      dateTime: new Date(data.date),
      applicants: data.applicants,
      interviewers: data.interviewers,
    };
    let applicantOptions = [];
    let interviewerOptions = [];
    applicants.map((applicant) => {
      return (applicantOptions = [
        {
          label: applicant.applicantName,
          value: applicant.applicantId,
        },
        ...applicantOptions,
      ]);
    });
    interviewers.map((interviewer) => {
      return (interviewerOptions = [
        {
          label: interviewer.interviewerName,
          value: interviewer.interviewerId,
        },
        ...interviewerOptions,
      ]);
    });

    return (
      <Container className="mt-2" fluid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <FormTopBar header="Edit Interview" />
              <Row className="mt-2">
                <Col sm="4">
                  <FormControl control="input" name="title" label="Title " />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm="4">
                  <FormControl
                    control="multi"
                    name="applicants"
                    label="Select applicants"
                    options={applicantOptions}
                  />
                </Col>
                <Col sm="4">
                  <FormControl
                    control="multi"
                    name="interviewers"
                    label="Select Interviewer"
                    options={interviewerOptions}
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
  }
};

export default EditInterview;
