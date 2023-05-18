import React from "react";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import TextError from "./TextError";

const Select = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <Field name={name}>
        {({ field }) => {
          return (
            <Form.Group>
              <Form.Label>{label} :</Form.Label>
              <Form.Select name={name} {...rest} {...field}>
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;
