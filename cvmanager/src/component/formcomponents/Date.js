import React from "react";
import DatePicker from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import TextError from "./TextError";

const Date = (props) => {
  const { name, label, ...rest } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              name={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              autoComplete="off"
              showYearDropdown
              scrollableMonthYearDropdown
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Date;
