import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormTopBar from "../../component/formcomponents/FormTopBar";
import { useNavigate } from "react-router-dom";
import FormControl from "../../component/formcomponents/FormControl";
import useFetch from "../../utilities/useFetch";
import { useParams } from "react-router-dom";
import usePut from "../../utilities/usePut";
import Spinner from "react-bootstrap/Spinner";
const EditOfferletter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { putData } = usePut();
  const { datas: data, loading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/offerletter/${id}`
  );
  const { datas: applicants, loading: loading2 } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/applicants`
  );
  const validationSchema = Yup.object({
    textEditor: Yup.string().required("required"),
    applicant: Yup.array()
      .max(1, "Please select only one option.")
      .min(1, "Please select one option")
      .required("Please select at least one option."),
    remark: Yup.string().required("required"),
  });
  const onSubmit = (values) => {
    const offerLetterData = {
      applicantName: values.applicant[0].label,
      applicantId: values.applicant[0].value,
      textEditor: values.textEditor,
      remark: values.remark,
    };
    putData(
      `${process.env.REACT_APP_BASE_URL}/offerletter/`,
      id,
      offerLetterData,
      "Assessment Test Edited Sucessfully"
    );
    navigate(-1);
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
    const initialValues = {
      textEditor: data.textEditor,
      applicant: [
        {
          label: data.applicantName,
          value: data.applicantId,
        },
      ],
      remark: data.remark,
    };
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
              <Row className="mt-2 mb-2">
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

export default EditOfferletter;
