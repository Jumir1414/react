import React from "react";
import { Field, ErrorMessage } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import TextError from "./TextError";
import Form from "react-bootstrap/Form";
const TextArea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div>
      <Field name={name}>
        {({ field }) => {
          return (
            <Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label={label}
                className="mb-3"
                {...rest}
                {...field}
              >
                <Form.Control
                  as="textarea"
                  name={name}
                  placeholder={label}
                  {...rest}
                  {...field}
                />
              </FloatingLabel>
            </Form.Group>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextArea;
