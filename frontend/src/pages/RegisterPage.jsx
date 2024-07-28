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
import { Link, useNavigate } from "react-router-dom";
import colors from "../assets/colors";
import { useState } from "react";
import "./RegisterPage.css";
import toast from "react-hot-toast";
import { RegisterUser } from "../service/userService";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerData, setLoginData] = useState({
    userRole: null,
    name: null,
    nic: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...registerData };
    if (user.password !== user.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    delete user.confirmPassword;
    await RegisterUser(user)
      .then(({ data }) => {
        toast.success(data);
        setTimeout(() => {
          navigate("/login");
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
        height: "auto",
      }}
    >
      <div className="register-container">
        <div className="register-left">
          <img
            src="/register-page.jpg"
            alt=""
            style={{ borderRadius: "15px" }}
          />
        </div>
        <div className="register-right">
          <Typography variant="h5">Register</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth required>
              <InputLabel id="user-role">User Role</InputLabel>
              <Select
                labelId="user-role"
                label="User Role"
                value={registerData.userRole}
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
              name="name"
              type="text"
              label="Full Name"
              required
              value={registerData.name}
              onChange={handleFormChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="nic"
              type="text"
              label="NIC Number"
              required
              value={registerData.nic}
              onChange={handleFormChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="email"
              type="email"
              label="Email"
              required
              value={registerData.email}
              onChange={handleFormChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              type="password"
              label="Password"
              required
              value={registerData.password}
              onChange={handleFormChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              required
              value={registerData.confirmPassword}
              onChange={handleFormChange}
            />
            <Button
              variant="contained"
              style={{ marginTop: "3rem", backgroundColor: colors.primary }}
              fullWidth
              type="submit"
            >
              Register
            </Button>
            <Typography sx={{ mt: 2 }}>
              Already Have an account?
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                SignIn
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </Box>
  );
}
