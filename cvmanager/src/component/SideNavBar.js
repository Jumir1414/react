import React from "react";
import { Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideNavBar = () => {
  return (
    <nav>
      <Stack gap={1}>
        <NavLink to="overview">Overview</NavLink>
        <NavLink to="applicant">Applicants</NavLink>
        <NavLink to="interviewer">Interviewers</NavLink>
        <NavLink to="assesmenttest">Assessment Tests</NavLink>
        <NavLink to="interview">Interviews</NavLink>
        {/* <NavLink>Letter Service</NavLink> */}
        {/* <NavLink to="position">Position</NavLink> */}
        <NavLink to="offerletter">Offer Letters</NavLink>
      </Stack>
    </nav>
  );
};

export default SideNavBar;
