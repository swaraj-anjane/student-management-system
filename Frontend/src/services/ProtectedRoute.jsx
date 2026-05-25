import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token");
  let isLoggedIn = localStorage.getItem("logginStatus") === "loggedIn";
  console.log(!token);
  if (!token && !isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoute;
