import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { AuthContext } from "../AuthProvider/authProvider";

export default function SimpleBottomNavigation() {
  const { userTab, setUserTab } = React.useContext(AuthContext);

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999 }}>
      <BottomNavigation showLabels value={userTab}>
        <BottomNavigationAction
          label="Perfil"
          onClick={() => {
            setUserTab("Perfil");
          }}
          icon={<AccountCircleOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Historial Compras"
          onClick={() => {
            setUserTab("Historial Compras");
          }}
          icon={<LocalMallOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Métodos de Pago"
          onClick={() => {
            setUserTab("Métodos de Pago");
          }}
          icon={<CreditCardOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
