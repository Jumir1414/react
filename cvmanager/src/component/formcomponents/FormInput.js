import React from "react";
import { Col } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import TextError from "./TextError";

const FormInput = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div>
      <Field name={name} {...rest}>
        {({ field }) => {
          return (
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>{label} :</Form.Label>
              <Form.Control size="sm" name={name} {...rest} {...field} />
              <ErrorMessage name={name} component={TextError} />
            </Form.Group>
          );
        }}
      </Field>
    </div>
  );
};

export default FormInput;
