import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("PrivateRoute.js, this:", isAuthenticated);
  return isAuthenticated ? (<Route {...props} />) : (
    <Redirect to={{ pathname: "/login",
                    // state: { from: location}
    }} />
  );
};

export default PrivateRoute;