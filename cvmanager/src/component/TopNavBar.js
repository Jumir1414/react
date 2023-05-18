import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/Amnillogo.png";

const TopNavBar = () => {
  return (
    <Navbar className="top-navbar">
      <Container className="nav-container">
        <Navbar.Brand>
          <img
            src={Logo}
            width="171"
            height="51"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <div className="title">
          <h1>CV Management</h1>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
