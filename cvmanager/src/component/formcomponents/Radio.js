import React from "react";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import TextError from "./TextError";

const Radio = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <Form.Group>
        <Form.Label>{label} :</Form.Label>
      </Form.Group>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <Form.Check
                  inline
                  label={option.key}
                  type="radio"
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Radio;
