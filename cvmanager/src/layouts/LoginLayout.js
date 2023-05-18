import React from "react";
import Container from "react-bootstrap/Container";
import LoginCard from "../component/LoginCard";
import TopNavBar from "../component/TopNavBar";
const LoginLayout = () => {
  return (
    <div className="login-layout">
      <header>
        <TopNavBar />
      </header>
      <Container className="login-container">
        <LoginCard />
      </Container>
    </div>
  );
};

export default LoginLayout;
