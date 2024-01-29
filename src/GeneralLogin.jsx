import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "./componentes/AuthProvider/authProvider";

const ProtectedRoute = ({
  component: Component,
  allowedRoles,
  redirectUnauthorized,
  ...rest
}) => {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    console.log("Valor actualizado de auth en generlaLoginxd:", auth);
  }, [auth]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth && auth.token) {
          console.log("esto es authGeneralLogin:", auth);
          if (auth.token.admin === true) {
            return <Component {...props} />;
          } else {
            console.log("No se paso user o es undefined");
            if (redirectUnauthorized) {
              return <Redirect to="/unauthorized" />;
            } else {
              return null;
            }
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
