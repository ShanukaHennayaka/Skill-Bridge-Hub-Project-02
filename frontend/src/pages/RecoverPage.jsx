import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import colors from "../assets/colors";
import { useState } from "react";
import { ChangePassword, SendVerifyCode } from "../service/recoverService";
import toast from "react-hot-toast";

export default function RecoverPage() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState(null);
  const [code, setCode] = useState("");

  const generateRandomNumber = () => {
    const number = Math.floor(100000 + Math.random() * 900000);
    setVerifyCode(number);
    return number;
  };

  const handleVerificationSend = async () => {
    const code = generateRandomNumber();
    const recover = {
      email: email,
      role: role,
      code: code,
    };
    await SendVerifyCode(recover)
      .then(() => {
        setIsVerify(true);
      })
      .catch((err) => toast.error(err.response.data));
    // setIsVerify(true);
  };

  const verify = () => {
    console.log(code, verifyCode);
    if (parseInt(code) === parseInt(verifyCode)) {
      setIsReset(true);
    } else {
      toast.error("Invalid Code");
      setCode("");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== conPassword) {
      return toast.error("Password doesn't match");
    }
    const recover = {
      email: email,
      role: role,
      password: newPassword,
    };
    await ChangePassword(recover)
      .then(({ data }) => {
        toast.success(data);
        setTimeout(() => {
          window.location = "/login";
        }, 500);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <div style={{ margin: "3rem", height: "70vh" }}>
      <Typography variant="h4">Get back into your account</Typography>
      <br />
      {!isVerify && !isReset && (
        <>
          <FormControl margin="normal" sx={{ width: "400px" }}>
            <InputLabel id="user-role">User Role</InputLabel>
            <Select
              labelId="user-role"
              label="User Role"
              value={role}
              name="userRole"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Employer">Employer</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <InputLabel style={{ fontWeight: "bold" }}>
            Enter your email
          </InputLabel>
          <TextField
            type="email"
            name="email"
            sx={{ width: "400px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <br />
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
              onClick={() => (window.location = "/login")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.primary }}
              onClick={handleVerificationSend}
            >
              Next
            </Button>
          </div>
        </>
      )}
      {isVerify && !isReset && (
        <>
          <Typography>Please enter the code that send to {email}</Typography>
          <br />
          <TextField
            type="number"
            sx={{ width: "400px" }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <br />
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
              onClick={() => setIsVerify(false)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.primary }}
              onClick={verify}
            >
              Verify
            </Button>
          </div>
        </>
      )}
      {isReset && (
        <>
          <Typography>
            Please give a new password to change the password.
          </Typography>
          <br />
          <InputLabel style={{ fontWeight: "bold" }}>New Password</InputLabel>
          <TextField
            type="password"
            sx={{ width: "400px" }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <br />
          <InputLabel style={{ fontWeight: "bold" }}>
            Confirm Password
          </InputLabel>
          <TextField
            type="password"
            sx={{ width: "400px" }}
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
          />
          <br />
          <br />
          <br />
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
              onClick={() => setIsReset(false)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.primary }}
              onClick={handleChangePassword}
            >
              save Password
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
