import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Field, ErrorMessage } from "formik";
const TextEditor = (props) => {
  const { name, label } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return (
            <ReactQuill
              theme="snow"
              placeholder={"Write something awesome..."}
              value={field.value}
              onChange={field.onChange(field.name)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default TextEditor;
