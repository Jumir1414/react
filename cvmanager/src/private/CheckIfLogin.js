import { Navigate } from "react-router-dom";

const CheckIfLogin = ({ Component }) => {
  let user = localStorage.getItem("UserInfo");
  if (user != null) {
    return <Navigate to="/home" />;
  } else return Component;
};

export default CheckIfLogin;
