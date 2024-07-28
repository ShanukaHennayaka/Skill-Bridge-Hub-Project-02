/* eslint-disable react/prop-types */
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
import colors from "../assets/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { Badge, Drawer } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Notification from "./Notification/Notification";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const navItems = [
  { name: "Home", Link: "/" },
  {
    name: (
      <Typography fontSize={'15px'} style={{ display: "flex", alignItems: "center" }}>
        Services <ArrowDropDownIcon />
      </Typography>
    ),
    submenu: [
      { name: "Professional Services", Link: "/professional-services" },
      { name: "Domestic Services", Link: "/domestic-services" },
      {
        name: "Hospitality and Lifestyle Services",
        Link: "/hospitality-and-lifestyle-services",
      },
    ],
  },
  { name: "About Us", Link: "/about-us" },
  { name: "Contact Us", Link: "/contact-us" },
];

export default function Header({ user = null, notificationCount, setNotificationCount }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElServices, setAnchorElServices] = React.useState(null);
  const [openNotification, setOpenNotification] = React.useState(false);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenServicesMenu = (event) => {
    setAnchorElServices(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseServicesMenu = () => {
    setAnchorElServices(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenNotification(open);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: "50px", marginRight: "2rem" }}
            />
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            SkillBridge
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color={colors.primary}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navItems.map((nav) => (
                <div key={nav.name}>
                  <MenuItem
                    onClick={
                      nav.submenu
                        ? handleOpenServicesMenu
                        : () => {
                            handleCloseNavMenu();
                            navigate(nav.Link);
                          }
                    }
                  >
                    <Typography
                      textAlign="center"
                      fontSize={"15px"}
                      color={colors.primary}
                    >
                      {nav.name}
                    </Typography>
                  </MenuItem>
                </div>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: "50px", marginRight: "2rem" }}
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            SkillBridge
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navItems.map((nav) => (
              <div key={nav.name}>
                <Button
                  onClick={
                    nav.submenu
                      ? handleOpenServicesMenu
                      : () => {
                          handleCloseNavMenu();
                          window.location = nav.Link;
                        }
                  }
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {nav.name}
                </Button>
                {nav.submenu && (
                  <Menu
                    id="submenu-appbar"
                    anchorEl={anchorElServices}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElServices)}
                    onClose={handleCloseServicesMenu}
                  >
                    {nav.submenu.map((subItem) => (
                      <MenuItem
                        key={subItem.name}
                        onClick={() => {
                          handleCloseServicesMenu();
                          window.location = subItem.Link;
                        }}
                      >
                        <Typography
                          textAlign="center"
                          fontSize={"15px"}
                          color={colors.primary}
                        >
                          {subItem.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>
            ))}
          </Box>
          {user && user.userRole === "Admin" && (
            <IconButton
              onClick={() => (window.location = "/admin")}
              sx={{ p: 0 }}
            >
              <AdminPanelSettingsIcon
                style={{ color: "lightgray", fontSize: "40px" }}
              />
            </IconButton>
          )}
          {user && user.userRole !== "Admin" && (
            <IconButton
              sx={{ marginRight: "2rem", cursor: "pointer" }}
              onClick={() => setOpenNotification(true)}
            >
              <Badge badgeContent={notificationCount} color="warning">
                <NotificationsIcon
                  style={{ color: "white", fontSize: "30px" }}
                />
              </Badge>
            </IconButton>
          )}
          {user && user.userRole !== "Admin" && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/profile");
                  }}
                >
                  <Typography
                    textAlign="center"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <AccountCircleIcon sx={{ marginRight: "0.5rem" }} /> Profile
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <Typography
                    textAlign="center"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Log out
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/login");
                  }}
                >
                  <Typography
                    textAlign="center"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <LoginIcon sx={{ marginRight: "0.5rem" }} /> Sign In
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Drawer
        anchor={"right"}
        open={openNotification}
        onClose={toggleDrawer("right", false)}
      >
        <Notification user={user} setNotificationCount={setNotificationCount} />
      </Drawer>
    </AppBar>
  );
}
