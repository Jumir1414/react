import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import FormControl from "../../component/formcomponents/FormControl";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import usePut from "../../utilities/usePut";
import useFetch from "../../utilities/useFetch";
const EditInterview = () => {
  const { id } = useParams();
  const { datas: data, loading: loading1 } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/interview/${id}`
  );
  const { datas: applicants, loading: loading2 } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/applicants`
  );
  const { datas: interviewers, loading: loading3 } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/interviewer`
  );
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
  const navigate = useNavigate();
  const { putData } = usePut();
  const onSubmit = (values) => {
    const date = moment(values.dateTime).format("YYYY-MM-DD HH:mm");

    const data = {
      title: values.title,
      date: date,
      interviewers: values.interviewers,
      applicants: values.applicants,
    };
    putData(
      `${process.env.REACT_APP_BASE_URL}/interview/`,
      id,
      data,
      "Interview Edited"
    );
    navigate("..");
  };
  if (loading1 || loading2 || loading3) {
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
        ...applicantOptions,
        {
          label: applicant.applicantName,
          value: applicant.id,
        },
      ]);
    });
    interviewers.map((interviewer) => {
      return (interviewerOptions = [
        ...interviewerOptions,
        {
          label: interviewer.interviewerName,
          value: interviewer.id,
        },
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
