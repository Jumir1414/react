import { Navigate } from "react-router-dom";

const CheckIfLogout = ({ Component }) => {
  let user = localStorage.getItem("UserInfo");
  if (user != null) {
    return Component;
  } else return <Navigate to="/" />;
};

export default CheckIfLogout;
