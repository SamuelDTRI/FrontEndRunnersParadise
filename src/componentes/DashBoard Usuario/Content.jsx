import * as React from "react";
import UserProfile from "../perfilDeUsuario/perfil";
import { AuthContext } from "../AuthProvider/authProvider";
import PaymentMethods from "./Métodos de pago/paymentMethods";
import Compras from "../Compras/compras";

export default function Content() {
  const { tab } = React.useContext(AuthContext);

  switch (tab) {
    case "Perfil de usuario":
      return (
        <div>
          <UserProfile />
        </div>
      );
      break;
    case "Medios de pago":
      return (
        <div>
          <PaymentMethods />
        </div>
      );
      break;
    case "Home":
      return (
        <div>
          <PaymentMethods />
        </div>
      );
      break;
    case "Compras":
      return (
        <div>
          <Compras />
        </div>
      );
    default:
      return (
        <div>
          <UserProfile />
        </div>
      );
  }
}
