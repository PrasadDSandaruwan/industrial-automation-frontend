import React from "react";
import { Redirect, Route } from "react-router-dom";
import Auth from "../../../services/user/authService";

const ProtectedRouteForcePassword = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => {
        if (!Auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            />
          );
        if (Auth.getForcePassword() === "VERIFIED_USER")
          return (
            <Redirect
              to={{
                pathname: "/dasboard",
                state: { from: props.location },
              }}
            />
          );

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRouteForcePassword;
