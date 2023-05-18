import React from "react";
import { MultiSelect } from "react-multi-select-component";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Form from "react-bootstrap/Form";
const MultipleSelect = (props) => {
  const { name, label, options } = props;
  return (
    <div>
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form;

          return (
            <Form.Group>
              <Form.Label>{label} :</Form.Label>
              <MultiSelect
                name={name}
                options={options}
                {...field}
                onChange={(val) => setFieldValue(name, val)}
              />
              <ErrorMessage name={name} component={TextError} />
            </Form.Group>
          );
        }}
      </Field>
    </div>
  );
};

export default MultipleSelect;
