import React from "react";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
const Select = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <Field name={name}>
        {/* {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })} */}
        {({ field }) => {
          return (
            <Form.Group as={Col} md="3">
              <Form.Label>{label}</Form.Label>
              <Form.Control as="select" name={name} {...rest} {...field}>
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default Select;
