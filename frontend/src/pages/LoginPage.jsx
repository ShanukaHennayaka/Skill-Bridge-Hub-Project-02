/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import colors from "../assets/colors";
import { useEffect, useState } from "react";
import { LoginUser, getCurrentUser } from "../service/userService";
import toast from "react-hot-toast";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userRole: "Employer",
    email: "",
    password: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

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
          navigate("/");
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
          <img src="/login-page.jpg" alt="" style={{ borderRadius: "15px" }} />
        </div>
        <div className="login-right">
          <Typography variant="h5">Sign In</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel id="user-role">User Role</InputLabel>
              <Select
                labelId="user-role"
                label="User Role"
                value={loginData.userRole}
                name="userRole"
                onChange={handleFormChange}
              >
                <MenuItem value="Employer">Employer</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
              </Select>
            </FormControl>
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
              style={{ marginTop: "2rem", backgroundColor: colors.primary }}
              fullWidth
              type="submit"
            >
              Sign In
            </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ mt: 2 }}>
                Don&apos;t Have an account?{" "}
                <Link style={{ textDecoration: "none" }} to={"/register"}>
                  Register
                </Link>
              </Typography>
              <Link
                sx={{ mt: 3 }}
                style={{ marginTop: "1rem", textDecoration: "none" }}
                to={"/recover-password"}
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}
