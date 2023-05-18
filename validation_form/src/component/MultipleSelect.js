import React from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Field, ErrorMessage } from "formik";
const MultipleSelect = (props) => {
  const { name, label, options } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form;

          return (
            <MultiSelect
              name={name}
              options={options}
              {...field}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default MultipleSelect;
