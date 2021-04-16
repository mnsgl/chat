import React from "react";
import { UserContext } from "../context/UserContext";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const [user] = React.useContext(UserContext).user;
  let isLogin = user?.user?.name;
  return isLogin ? <Component /> : <Redirect to="/" />;
}

export default PrivateRoute;
