import React from "react";
import Card from "react-bootstrap/Card";
import GoogleLogin from "../services/GoogleLogin";

const LoginCard = () => {
  return (
    <>
      <Card className="login-card">
        <div className="text-center">
          <Card.Header>Login</Card.Header>
          <Card.Body>
            {/* <Card.Title>Login With Google Account</Card.Title> */}
            <GoogleLogin />
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default LoginCard;
