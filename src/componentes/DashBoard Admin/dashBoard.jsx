import * as React from "react";
import BottomNavBar from "./bottonNav";
import ProductManager from "./Products";
import { AuthContext } from "../AuthProvider/authProvider";
import UserTableComponent from "./deleteUsers";
import DeleteReview from "./deleteReview";

export default function AdminDashboard() {
  const { admTab } = React.useContext(AuthContext);
  switch (admTab) {
    case "Productos":
      return (
        <div className="adminDash">
          <ProductManager />
          <BottomNavBar />
        </div>
      );
      break;
    case "Reviews":
      return (
        <div className="adminDash">
          <DeleteReview />
          <BottomNavBar />
        </div>
      );
    case "Usuarios":
      return (
        <div className="adminDash">
          <UserTableComponent />
          <BottomNavBar />
        </div>
      );
    default:
      return (
        <div className="adminDash">
          <ProductManager />
          <BottomNavBar />
        </div>
      );
  }
}
