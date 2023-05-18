import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
const File = (props) => {
  const { name, label, ...rest } = props;
  return (
    <div>
      <Field name={name}>
        {() => {
          return (
            <>
              <label>{label} :</label>
              <input
                type="file"
                // onChange={(event) => {
                //   setFieldValue({ filename }, event.target.files[0]);
                // }}
                {...rest}
              />
              <ErrorMessage name={name} component={TextError} />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default File;
