import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./componentes/AuthProvider/authProvider";

const ProtectedRoute = ({
  component: Component,
  redirectUnauthorized,
  ...rest
}) => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    console.log("Valor actualizado de auth en generalLoginxd:", auth);
  }, [auth]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth && auth.token) {
          console.log("esto es authGeneralLogin:", auth);
          if (auth.token.rol === "admin" || auth.token.rol === "seller") {
            return <Component {...props} />;
          } else if (auth.token.rol === "buyer" && redirectUnauthorized) {
            return <Redirect to="/unauthorized" />;
          } else {
            console.log("No se pasó el usuario o es undefined");
            return <Redirect to="/unauthorized" />;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
