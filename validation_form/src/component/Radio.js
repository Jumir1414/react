import React from "react";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
const Radio = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <Form.Label>{label} :</Form.Label>
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
      <ErrorMessage name={name} />
    </div>
  );
};

export default Radio;
