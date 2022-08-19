import { Redirect } from "react-router-dom";

const Protected = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" replace />;
  }

  return children;

};

export default Protected;