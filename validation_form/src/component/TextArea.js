import React from "react";
import { Field, ErrorMessage } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
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
              >
                <Form.Control as="textarea" placeholder={label} />
              </FloatingLabel>
            </Form.Group>
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default TextArea;
