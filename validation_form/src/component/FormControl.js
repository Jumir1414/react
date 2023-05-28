import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import Radio from "./Radio";
import Date from "./DatePicker";
import MultipleSelect from "./MultipleSelect";
import TextEditor from "./TextEditor";
const FormControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <Radio {...rest} />;

    case "date":
      return <Date {...rest} />;

    case "multi":
      return <MultipleSelect {...rest} />;

    case "texteditor":
      return <TextEditor {...rest} />;

    default:
      return null;
  }
};

export default FormControl;
