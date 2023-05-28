import React from "react";

const ErrorMsg = ({ msg = "" }) => {
  return <h5 className="mt-5 text-center">{msg}</h5>;
};

export default ErrorMsg;
