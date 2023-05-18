import React from "react";
import FormInput from "./FormInput";
import Radio from "./Radio";
import Select from "./Select";
import File from "./File";
import Date from "./Date";
import TextArea from "./TextArea";
import MultipleSelect from "./MultipleSelect";

const FormControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <FormInput {...rest} />;

    case "radio":
      return <Radio {...rest} />;

    case "select":
      return <Select {...rest} />;

    case "file":
      return <File {...rest} />;

    case "date":
      return <Date {...rest} />;

    case "textarea":
      return <TextArea {...rest} />;

    case "multi":
      return <MultipleSelect {...rest} />;

    default:
      return null;
  }
};

export default FormControl;
