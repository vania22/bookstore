import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../api/api";

const AdminRoute = ({ component: Component, ...restProps }) => {
  const { user } = isAuthenticated();

  return (
    <Route
      {...restProps}
      render={(props) =>
        user && user.role === 1 ? (
          <Component {...restProps} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AdminRoute;
