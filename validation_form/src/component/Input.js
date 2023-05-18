import React from "react";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div>
      <Field name={name} {...rest}>
        {({ field }) => {
          return (
            <Form.Group as={Col} md="3">
              <Form.Label>{label}</Form.Label>
              <Form.Control name={name} {...rest} {...field} />
              <ErrorMessage name={name} />
            </Form.Group>
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
