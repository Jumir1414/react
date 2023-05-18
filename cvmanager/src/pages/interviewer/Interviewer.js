import React from "react";
import { Container } from "react-bootstrap";
import HeaderBar from "../../component/HeaderBar";
const Interviewer = () => {
  return (
    <Container fluid>
      <HeaderBar path={"createinterviewer"} header={"Interviewer"} />
    </Container>
  );
};

export default Interviewer;
