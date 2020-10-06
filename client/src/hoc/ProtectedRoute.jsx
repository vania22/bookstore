import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../api/auth";

const ProtectedRoute = ({ component: Component, ...restProps }) => (
  <Route
    {...restProps}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...restProps} />
      ) : (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      )
    }
  />
);

export default ProtectedRoute;
