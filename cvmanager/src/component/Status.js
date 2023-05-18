import React, { useState, useEffect } from "react";
import { Stepper, Step } from "react-form-stepper";
const Status = ({ data }) => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    // Update the active step based on the data
    if (data === "Offered") {
      setActiveStep(2);
    } else if (data === "Interviewing") {
      setActiveStep(1);
    } else if (data === "Hired") {
      setActiveStep(3);
    } else if (data === "Shortlisted") {
      setActiveStep(0);
    }
  }, []);
  if (data === "Blacklisted" || data === "Rejected") {
    return (
      <div className="text-center">
        <h1 style={{ color: "red" }}>{data}</h1>
      </div>
    );
  } else {
    return (
      <Stepper
        activeStep={activeStep}
        styleConfig={{
          size: "3rem",
          completedBgColor: "#5e6a75",
          activeBgColor: "#d9353e",
          labelFontSize: "1rem",
        }}
      >
        <Step
          label="Shortlisted"
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <Step
          label="Interviewing"
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <Step
          label="Offered"
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <Step
          label="Hired"
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
      </Stepper>
    );
  }
};

export default Status;
