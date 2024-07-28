/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { cities } from "../../assets/countries";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { UpdateUserDetails } from "../../service/userService";
import toast from "react-hot-toast";

export default function YourInfo({ user = null, getUser }) {
  const [isPIEditing, setIsPIEditing] = useState(false);
  const [isSkillEditing, setIsSkillEditing] = useState(false);
  const [isCDEditing, setIsCDEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [skills, setSkills] = useState([]);
  const [openSkill, setOpenSkill] = useState(false);
  const [skill, setSkill] = useState(null);
  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    email: "",
  });

  useEffect(() => {
    console.log("first",user)
    setUserData(user);
    setSkills(user.skills || null);
    setCompanyData(user.companyDetails|| null);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };
  const handleDeleteSkills = (skill) => {
    setSkills(skills.filter((sk) => sk !== skill));
    setIsSkillEditing(true);
  };

  const handleAddSkill = (skill) => {
    let updatedSkills = [...skills];
    updatedSkills.push(skill);
    setSkills(updatedSkills);
    setIsSkillEditing(true);
    setOpenSkill(false);
  };
  const handleCloseSkill = () => {
    setOpenSkill(false);
  };

  const handleSubmit = async () => {
    let updatedUser = { ...userData };
    updatedUser.skills = skills;
    updatedUser.companyDetails = companyData;

    await UpdateUserDetails(updatedUser)
      .then(({ data }) => {
        toast.success(data);
        getUser();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        console.log(err);
      });
  };

  return (
    <Box>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight={"bold"}>
            Personal Info
          </Typography>
          {isPIEditing ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => {
                setIsPIEditing(false);
                handleSubmit();
              }}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<BorderColorIcon />}
              onClick={() => setIsPIEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
        <hr />
      </div>
      <div
        style={{
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "1rem",
            marginTop: "3rem",
          }}
        >
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            disabled={!isPIEditing}
            type="text"
            name="name"
            value={userData.name ? userData.name : ""}
            onChange={handleChange}
            style={{ marginRight: "2rem" }}
          />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            disabled={!isPIEditing}
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={{ marginRight: "2rem" }}
          />
          <TextField
            label="NIC Number"
            variant="standard"
            fullWidth
            disabled={!isPIEditing}
            type="text"
            name="nic"
            value={userData.nic}
            onChange={handleChange}
            style={{ marginRight: "2rem" }}
          />
          <FormControl fullWidth variant="standard" disabled={!isPIEditing}>
            <InputLabel id="countries">Location</InputLabel>
            <Select
              labelId="countries"
              label="Location"
              name="location"
              value={userData.location + ""}
              onChange={handleChange}
            >
              {cities.map((country, i) => (
                <MenuItem key={i} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          disabled={!isPIEditing}
          multiline
          rows={6}
          name="description"
          value={userData.description}
          onChange={handleChange}
        />
      </div>
      {user.userRole === "Professional" && (
        <div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Skills
              </Typography>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setOpenSkill(true)}
                  style={{ marginRight: "1rem" }}
                >
                  Add Skill
                </Button>
                {isSkillEditing && (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      setIsSkillEditing(false);
                      handleSubmit();
                    }}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>

            <hr />
          </div>
          <div
            style={{
              marginBottom: "3rem",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 1,
                m: 0,
                paddingTop: "2rem",
              }}
              component="ul"
            >
              {skills.length !== 0 ? (
                skills.map((skill, i) => (
                  <Chip
                    key={i}
                    label={skill}
                    onDelete={() => {
                      handleDeleteSkills(skill);
                    }}
                    style={{ marginLeft: "2rem", marginBottom: "2rem" }}
                  />
                ))
              ) : (
                <div>No Skills Added</div>
              )}
            </Paper>
          </div>
        </div>
      )}

      {user.userRole === "Employer" && (
        <div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Company Info
              </Typography>
              <div>
                {isCDEditing ? (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      setIsCDEditing(false);
                      handleSubmit();
                    }}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<BorderColorIcon />}
                    onClick={() => setIsCDEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>

            <hr />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "3rem",
              marginBottom: "3rem",
            }}
          >
            <TextField
              label="Company Name"
              variant="standard"
              fullWidth
              disabled={!isCDEditing}
              type="text"
              name="name"
              value={companyData && companyData.name}
              onChange={handleCompanyChange}
              style={{ marginRight: "2rem" }}
            />
            <TextField
              label="Website"
              variant="standard"
              fullWidth
              disabled={!isCDEditing}
              type="text"
              name="website"
              value={companyData && companyData.website}
              onChange={handleCompanyChange}
              style={{ marginRight: "2rem" }}
            />
            <TextField
              label="Email Address"
              variant="standard"
              fullWidth
              disabled={!isCDEditing}
              type="text"
              name="email"
              value={companyData && companyData.email}
              onChange={handleCompanyChange}
              style={{ marginRight: "2rem" }}
            />
          </div>
        </div>
      )}

      <Dialog fullWidth={true} open={openSkill} onClose={handleCloseSkill}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Add a New Skill
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Skill"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setSkill(e.target.value);
              }}
              margin="normal"
            />
            <div style={{ display: "flex", justifyContent:'flex-end' }}>
              <Button variant="contained" onClick={() => handleAddSkill(skill)}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
