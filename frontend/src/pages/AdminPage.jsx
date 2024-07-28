/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import colors from "../assets/colors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AdminDashboard from "../components/Admin/AdminDashboard";
import UserManagement from "../components/Admin/UserManagement";
import Verifications from "../components/Admin/Verifications";
import PostManagement from "../components/Admin/PostManagement";
import LogoutIcon from "@mui/icons-material/Logout";
import { getCurrentUser } from "../service/userService";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Questions from "../components/Admin/Questions";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminPage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState("Dashboard");
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          window.location = "/skb-admin";
        }
        if (user.userRole !== "Admin") {
          window.location = "/";
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  const drawerItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "User Management", icon: <PeopleAltIcon /> },
    { name: "Verifications", icon: <VerifiedIcon /> },
    { name: "Post Management", icon: <DynamicFeedIcon /> },
    { name: "Questions", icon: <QuestionAnswerIcon /> },
    { name: "Log Out", icon: <LogoutIcon /> },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ mr: 1 }}>
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
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ marginTop: "2rem" }}>
          {drawerItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: "block",
                marginTop: item.name === "Log Out" && "5rem",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  if (item.name === "Log Out") {
                    localStorage.clear();
                    window.location = "/";
                  } else {
                    setSelectedItem(item.name);
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: item.name === selectedItem && colors.secondary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  style={
                    item.name === selectedItem
                      ? {
                          opacity: open ? 1 : 0,
                          color: item.name === selectedItem && colors.secondary,
                          fontWeight: "bold",
                        }
                      : {
                          opacity: open ? 1 : 0,
                        }
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {selectedItem === "Dashboard" && <AdminDashboard />}
        {selectedItem === "User Management" && <UserManagement />}
        {selectedItem === "Verifications" && <Verifications />}
        {selectedItem === "Post Management" && <PostManagement />}
        {selectedItem === "Questions" && <Questions />}
      </Box>
    </Box>
  );
}
