import * as React from "react";
import SimpleBottomNavigation from "./bottomNav";
import PaymentMethods from "./Métodos de pago/paymentMethods";
import { AuthContext } from "../AuthProvider/authProvider";
import UserProfile from "../perfilDeUsuario/perfil";
import Compras from "../Compras/compras";

export default function NewUserDashboard() {
  const { userTab } = React.useContext(AuthContext);
  switch (userTab) {
    case "Métodos de Pago":
      return (
        <div className="adminDash">
          <PaymentMethods />
          <SimpleBottomNavigation />
        </div>
      );
      break;
    case "Perfil":
      return (
        <div className="adminDash">
          <UserProfile />
          <SimpleBottomNavigation />
        </div>
      );
    case "Historial Compras":
      return (
        <div className="adminDash">
          <Compras />
          <SimpleBottomNavigation />
        </div>
      );
    default:
      return (
        <div className="adminDash">
          <UserProfile />
          <SimpleBottomNavigation />
        </div>
      );
  }
}
