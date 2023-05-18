import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

const GoogleLogin = () => {
  const navigate = useNavigate();

  return (
    <LoginSocialGoogle
      client_id={process.env.REACT_APP_GOOGLE_AUTH}
      scope="openid profile email"
      discoveryDocs="claims_supported"
      access_type="online"
      onResolve={({ data }) => {
        const User = {
          acessToken: data.access_token,
          name: data.name,
          image: data.picture,
          isLog: true,
        };
        console.log(data);
        localStorage.setItem("UserInfo", JSON.stringify(User));

        navigate("home");
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
};

export default GoogleLogin;
