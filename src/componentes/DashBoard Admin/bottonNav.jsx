import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StarIcon from "@mui/icons-material/Star";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../AuthProvider/authProvider";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const { admTab, setAdmTab } = React.useContext(AuthContext);
  const onChange = (newValue) => {
    setAdmTab(newValue);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 500,
        zIndex: 9999,
      }}
    >
      <BottomNavigation showLabels value={admTab}>
        <BottomNavigationAction
          label="REVIEWS"
          onClick={() => {
            onChange("Reviews");
          }}
          icon={<StarIcon />}
        />
        <BottomNavigationAction
          label="PRODUCTOS"
          onClick={() => {
            onChange("Productos");
          }}
          icon={<LocalMallIcon />}
        />
        <BottomNavigationAction
          label="USUARIOS"
          onClick={() => {
            onChange("Usuarios");
          }}
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
