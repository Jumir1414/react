import React from "react";
import { Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideNavBar = () => {
  return (
    <nav>
      <Stack gap={1}>
        <NavLink to="applicant">Applicants</NavLink>
        {/* <NavLink to="awad">Applicants With All Details</NavLink>
        <NavLink to="awe">Applicants With Experience</NavLink>
        <NavLink to="awi">Applicants With Interview</NavLink> */}
        <NavLink to="assesmenttest">Assesment Tests</NavLink>
        <NavLink to="experience">Experience</NavLink>
        <NavLink to="interview">Interviews</NavLink>
        <NavLink to="interviewer">Interviewers</NavLink>
        {/* <NavLink>Letter Servivce</NavLink> */}
        {/* <NavLink to="position">Position</NavLink> */}
        <NavLink to="offerletter">Offer Letters</NavLink>
      </Stack>
    </nav>
  );
};

export default SideNavBar;
