import { Outlet, Navigate } from "react-router-dom";
// import Axios from "axios";

const PrivateRoutes = ({ token }) => {
  // let auth = {'token':false}
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
