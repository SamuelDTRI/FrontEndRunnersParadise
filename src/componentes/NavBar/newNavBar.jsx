import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../assets/Runners Paradise.png";
import { Link } from "react-router-dom";
import style from "./navBar.module.css";
import { AuthContext } from "../AuthProvider/authProvider";
import BuyerNavBar from "./buyerNavBar";
import AdminNavBar from "./adminNavBar";

const pages = ["About Us", "Store"];
const settings = ["Register", "LogIn" ];

function ResponsiveAppBar() {
  const { auth, setAuth } = React.useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (!auth) {
    return (
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              to="/home"
              className="nav-link active text-primary"
              aria-current="page"
            >
              <img
                className={style.logoRunners}
                src={logo}
                alt="Runners Paradise Logo"
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              ></IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/*  {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" >{page}</Typography>
                </MenuItem>
              ))} */}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <React.Fragment key={page}>
                  {page === "About Us" && (
                    <Link to="/about" key={page}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "black", display: "block" }}
                      >
                        {page}
                      </Button>
                    </Link>
                  )}
                  {page === "Store" && (
                    <a href="#catalogue" key={page}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "black", display: "block" }}
                      >
                        {page}
                      </Button>
                    </a>
                  )}
                </React.Fragment>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <MenuIcon
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={handleOpenUserMenu}
                />
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <div key={setting}>
                    {setting === "Register" && (
                      <Link to="/register">
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </Link>
                    )}
                    {setting === "LogIn" && (
                      <Link to="/login">
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </Link>
                    )}
                  </div>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (auth) {
    //buyer
    return <BuyerNavBar />;
  }

  if (auth) {
    return <AdminNavBar />;
  }
}

export default ResponsiveAppBar;
