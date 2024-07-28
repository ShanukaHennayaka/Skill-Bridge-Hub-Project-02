/* eslint-disable react/prop-types */
import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import "./ProfilePage.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteIcon from "@mui/icons-material/Delete";
import OtherSections from "../components/Profile/OtherSections";
import { useEffect, useState } from "react";
import { DeleteUser, getCurrentUser } from "../service/userService";
import ProfessionalVerification from "../components/Profile/ProfessionalVerification";
import { GetAllTaskByUser } from "../service/taskService";
import toast from "react-hot-toast";

export default function ProfilePage({ user = null, setUser }) {
  const [openVerify, setOpenVerify] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [numOfPost, setNumOfPost] = useState(0);

  const getNumOfPosts = (num) => {
    setNumOfPost(num);
  };

  const fetchAllTasks = async () => {
    await GetAllTaskByUser(user._id)
      .then(({ data }) => {
        getNumOfPosts([...data].length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUser = async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
      fetchAllTasks();
      if (user === null) {
        window.location = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    console.log(user)
    
  }, []);

  const handleCloseVerify = () => {
    setOpenVerify(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleUserDelete=async()=>{
    await DeleteUser(user._id).then(({data})=>{
      toast.success(data);
      localStorage.clear();
      window.location = "/"
    }).catch((err)=>{
      if(err.response){
        toast.error(err.response.data)
      }
      console.log(err)
    })
  }

  if (user !== null) {
    console.log(user.uid);
    return (
      <Box
        sx={{
          padding: "1rem",
          height: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="profile-section">
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/man.jpg"
                alt=""
                style={{
                  width: "120px",
                  height: "120px",
                  marginLeft: "2rem",
                  marginRight: "2rem",
                  marginBottom: "1rem",
                }}
              />
              {user.userRole === "Professional" && (
                <div>
                  <Chip
                    label={user.isVerified}
                    color={
                      user.isVerified === "Verified"
                        ? "success"
                        : user.isVerified === "Pending"
                        ? "primary"
                        : "error"
                    }
                    variant="outlined"
                    size="small"
                    sx={{ paddingX: "0.5rem" }}
                  />
                </div>
              )}
            </div>
            <div>
              <Typography variant="h6" fontWeight={"bold"} style={{marginBottom:'1rem'}} >
                {user.userRole}
              </Typography>
              
              <tr>
                <td>
                  <strong>UID</strong>
                </td>
                <td>{user.uid}</td>
              </tr>
              <tr>
                <td>
                  <strong>Name</strong>
                </td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td style={{ width: "4rem" }}>
                  <strong>Email</strong>
                </td>
                <td>{user.email}</td>
              </tr>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="profile-stats">
              {user.userRole === "Employer" && (
                <div className="profile-stats-card">
                  <h5>
                    <b>No of Tasks</b>
                  </h5>
                  <h6>{numOfPost}</h6>
                </div>
              )}
              {user.userRole === "Professional" && (
                <div className="profile-stats-card">
                  <h5>
                    <Rating name="read-only" value={user.feedback} readOnly precision={0.5} />
                  </h5>
                  <h6>({user.noOfJobsDone})</h6>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "5rem",
                }}
              >
                {user.isVerified !== "Verified" &&
                  user.isVerified !== "Pending" &&
                  user.userRole === "Professional" && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      sx={{ mb: 1.5 }}
                      size="small"
                      startIcon={<VerifiedIcon />}
                      onClick={() => {
                        setOpenVerify(true);
                      }}
                    >
                      Verify Account
                    </Button>
                  )}
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mb: 1.5 }}
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setOpenDelete(true);
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="other-sections">
          <OtherSections
            user={user}
            getUser={getUser}
            getNumOfPosts={getNumOfPosts}
          />
        </div>
        {/* Verify Dialog */}
        <Dialog
          fullWidth={true}
          open={openVerify}
          onClose={handleCloseVerify}
          maxWidth={"md"}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            Professional Verification
          </DialogTitle>
          <DialogContent>
            <ProfessionalVerification user={user} onClose={handleCloseVerify} />
          </DialogContent>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog fullWidth={true} open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            Delete Your Profile
          </DialogTitle>
          <DialogContent>
            <div style={{ fontSize: "18px" }}>
              Are you sure you want to delete account?
            </div>
          </DialogContent>
          <DialogActions>
            <div>
              <Button onClick={handleCloseDelete}>Cancel</Button>
              <Button onClick={handleUserDelete}>Delete</Button>
            </div>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}
