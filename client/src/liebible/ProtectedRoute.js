import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component}) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      } />
    );
}

// function ProtectedRoute({ component: Component, ...restOfProps }) {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");
//   console.log("this", isAuthenticated);

//   return (
//     <Route
//       {...restOfProps}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// }

export default ProtectedRoute;