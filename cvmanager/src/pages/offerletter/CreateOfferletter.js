import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import FormControl from "../../component/formcomponents/FormControl";
import useFetch from "../../utilities/useFetch";
import usePost from "../../utilities/usePost";
import Spinner from "react-bootstrap/Spinner";

const initialValues = {
  textEditor: "",
  applicant: [],
  remark: "",
};
const validationSchema = Yup.object({
  textEditor: Yup.string().required("required"),
  applicant: Yup.array()
    .max(1, "Please select only one option.")
    .min(1, "Please select one option")
    .required("Please select at least one option."),
  remark: Yup.string().required("required"),
});
const CreateOfferletter = () => {
  const { postData } = usePost();
  const { datas: applicants, loading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/applicants`
  );
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const offerLetterData = {
      applicantName: values.applicant[0].label,
      applicantId: values.applicant[0].value,
      textEditor: values.textEditor,
      remark: values.remark,
    };
    postData(
      `${process.env.REACT_APP_BASE_URL}/offerletter`,
      offerLetterData,
      "Letter Created"
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
    return (
      <Container className="mt-2" fluid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <FormTopBar header="Create Offer Letter" />
              <Row className="mt-3">
                <Col sm="4">
                  <FormControl
                    control="multi"
                    name="applicant"
                    label="Choose only one Applicant"
                    options={applicantOptions}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm={4}>
                  <FormControl
                    control="input"
                    name="remark"
                    label="Remarks"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="p-2 m-3" sm="9" style={{ background: "white" }}>
                  <FormControl
                    control="texteditor"
                    name="textEditor"
                    label="Text Editor :"
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
  }
};

export default CreateOfferletter;
