import React from "react";
import { Route } from "react-router-dom";
import LieBibleList from "./liebible-list.component";

function ProtectedRoute({ component: Component}) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route exact path="/liesbible" component={LieBibleList} />
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