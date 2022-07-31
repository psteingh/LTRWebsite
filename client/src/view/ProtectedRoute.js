import React from "react";
import { Redirect, Route } from "react-router-dom";

// function ProtectedRoute() {
//   return (
//     render=isAuthenticated ? <Route to="/admin" /> :
//      <Redirect to="/login" />) }

function ProtectedRoute({ component: Component, ...restOfProps}) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("ProtectedRoute.js, this:", isAuthenticated);
  return (
    <Route
    {...restOfProps}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }/> );}

export default ProtectedRoute;