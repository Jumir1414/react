import React from "react";
import * as Yup from "yup";
import FormControl from "./FormControl";
import { Form, Formik } from "formik";

import "react-multiple-select-dropdown-lite/dist/index.css";

const FormContainer = () => {
  const dropdownOptions = [
    { key: "select options", value: "" },
    { key: "option 1 ", value: "option1" },
    { key: "option 2", value: "option2" },
    { key: "option 3", value: "option3" },
  ];
  const options = [
    { label: "Option 1", value: "option_1" },
    { label: "Option 2", value: "option_2" },
    { label: "Option 3", value: "option_3" },
    { label: "Option 4", value: "option_4" },
  ];
  const radioOptions = [
    { key: "option 1 ", value: "roption1" },
    { key: "option 2", value: "roption2" },
    { key: "option 3", value: "roption3" },
  ];

  const initialValue = {
    email: "",
    name: "",
    textarea: "",
    selectOption: "",
    radioOption: "",
    date: null,
    // multiOptions: [],
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Enter Valid Email"),
    name: Yup.string().required("Required"),
    textarea: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
    date: Yup.date().nullable().required("Required"),
    // multioptions: Yup.array()
    //   .min(1, "Please select at least one option.")
    //   .of(Yup.string(), "Invalid option selected.")
    //   .required("Please select at least one option."),
  });

  const onSubmit =() => {
    console.log("hello");
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormControl control="input" name="name" type="text" label="Name" />
        <FormControl control="input" name="email" type="text" label="Email" />
        <FormControl
          control="textarea"
          name="textarea"
          type="text"
          label="Comment"
        />
        <FormControl
          control="select"
          name="selectOption"
          label="select topic"
          options={dropdownOptions}
        />
        <FormControl
          control="radio"
          name="radioOption"
          label="choose Option"
          options={radioOptions}
        />
        <FormControl control="date" name="date" label="choose date" />
        {/* <FormControl
          control="multi"
          name="multiOptions"
          options={options}
          label="multi"
        /> */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormContainer;
