/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import colors from "../assets/colors";
import { useState } from "react";
import { LoginUser } from "../service/userService";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userRole: "Admin",
    email: "",
    password: "",
  });

    const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginUser(loginData)
      .then(({ data }) => {
        localStorage.setItem("token", data);
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/admin");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data);
        }
      });
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        display: "grid",
        placeItems: "center",
        height: "90vh",
      }}
    >
      <div className="login-container">
        <div className="login-left">
          <img src="/admin.webp" alt="" style={{ borderRadius: "15px" }} />
        </div>
        <div className="login-right">
          <Typography variant="h5">Sign In</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              name="email"
              type="email"
              label="Email"
              value={loginData.email}
              onChange={handleFormChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              type="password"
              label="Password"
              value={loginData.password}
              onChange={handleFormChange}
            />
            <Button
              variant="contained"
              style={{ marginTop: "3rem", backgroundColor: colors.primary }}
              fullWidth
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </Box>
  );
}
