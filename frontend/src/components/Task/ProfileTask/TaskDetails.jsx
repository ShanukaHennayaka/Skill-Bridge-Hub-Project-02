/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import "../../../pages/TaskDetailsPage.css";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import colors from "../../../assets/colors";
import { GetTaskById, UpdateBiddingStatus } from "../../../service/taskService";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import { GetUniqueId } from "../../../service/commonServices";
import AddNewBidForm from "../../Bid/AddNewBidForm";

export default function TaskDetails({ user = null }) {
  const [attachments, setAttachments] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const { id } = useParams();
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openBid, setOpenBid] = useState(false);
  const [task, setTask] = useState({});

  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    fetchTask();
  };
  const handleCloseBid = () => {
    setOpenBid(false);
    fetchTask();
  };
  const fetchTask = async () => {
    await GetTaskById(id)
      .then(({ data }) => {
        setAttachments([...data.attachments]);
        setRequiredSkills([...data.requiredSkills]);
        setTask(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateBidding = async () => {
    await UpdateBiddingStatus(task._id)
      .then(({ data }) => {
        toast.success(data);
        handleCloseDeactivate();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <Box sx={{ height: "auto", display: "flex",}}>
      <div className="main-container">
        <div className="left-container">
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
                color="inherit"
                href="/"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
                color="inherit"
                href={`/${
                  task.mainCategory === "Professional Services"
                    ? "professional-services"
                    : task.mainCategory === "Domestic Services"
                    ? "domestic-services"
                    : task.mainCategory ===
                        "Hospitality and Lifestyle Services" &&
                      "hospitality-and-lifestyle-services"
                }`}
              >
                {task.mainCategory === "Professional Services" ? (
                  <AppRegistrationIcon
                    fontSize="small"
                    sx={{ marginRight: "0.5rem" }}
                  />
                ) : task.mainCategory === "Domestic Services" ? (
                  <MapsHomeWorkIcon
                    fontSize="small"
                    sx={{ marginRight: "0.5rem" }}
                  />
                ) : (
                  task.mainCategory ===
                    "Hospitality and Lifestyle Services" && (
                    <NightlifeIcon
                      fontSize="small"
                      sx={{ marginRight: "0.5rem" }}
                    />
                  )
                )}
                {task.mainCategory}
              </Link>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
                color="text.primary"
              >
                {task.subCategory}
              </Typography>
            </Breadcrumbs>
          </div>
          <img src={task.coverImage} alt="" />
          <div style={{ marginTop: "2rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="22px"
            >
              Attachments
            </Typography>
            <Paper
              sx={{
                display: "flex",

                p: 1,
                m: 0,
              }}
            >
              {attachments.length !== 0 ? (
                attachments.map((item, i) => {
                  let itemIcon;
                  if (item.type === "image") {
                    itemIcon = (
                      <FontAwesomeIcon
                        icon={faFileImage}
                        style={{ fontSize: "3rem" }}
                      />
                    );
                  }
                  return (
                    <a
                      key={i}
                      href={item.url}
                      style={{
                        textDecoration: "none",
                        color: colors.secondary,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "2rem",
                          cursor: "pointer",
                        }}
                      >
                        {itemIcon}
                        <span style={{ color: colors.primary }}>
                          {item.name}
                        </span>
                      </div>
                    </a>
                  );
                })
              ) : (
                <div>No attachments available</div>
              )}
            </Paper>
          </div>
        </div>
        <div className="right-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", marginBottom: "0.5rem" }}>
              <Avatar aria-label="recipe">R</Avatar>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "1rem",
                }}
              >
                <Typography variant="h6" style={{ marginRight: "0.3rem" }}>
                  {task.user && task.user.name}
                </Typography>
              </span>
            </div>
            {task.createdAt && format(new Date(task.createdAt), "yyyy-MM-dd")}
          </div>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            style={{ marginTop: "1rem" }}
          >
            {task.shortDescription}
          </Typography>
          <div style={{ display: "flex", marginTop: "2rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="20px"
            >
              Task ID
            </Typography>
            <Typography fontSize="20px">
              {`TSK-${GetUniqueId(task._id + "")}`}
            </Typography>
          </div>
          <div style={{ display: "flex", marginTop: "1rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="20px"
            >
              Budget
            </Typography>
            <Typography fontSize="20px">
              {parseInt(task.budget).toLocaleString("en-US", {
                style: "currency",
                currency: "LKR",
              })}
            </Typography>
          </div>

          <div style={{ display: "flex", marginTop: "1rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="20px"
            >
              Deadline
            </Typography>
            <Typography fontSize="20px">
              {task.deadline && format(new Date(task.deadline), "yyyy-MM-dd")}
            </Typography>
          </div>

          <div style={{ display: "flex", marginTop: "1rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="20px"
            >
              Location
            </Typography>
            <Typography fontSize="20px">{task.location}</Typography>
          </div>

          <div style={{ display: "flex", marginTop: "1rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="20px"
            >
              Bidding Status
            </Typography>
            <Typography fontSize="20px">
              {task.isBidding ? (
                <Chip
                  label="Open"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Chip
                  label="Closed"
                  color="error"
                  variant="outlined"
                  size="small"
                />
              )}
            </Typography>
          </div>

          {task.isBidding === true ? (
            user !== null ? (
              user.userRole === "Professional" && (
                <div style={{ display: "flex", marginTop: "2.5rem" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mx: "2rem", backgroundColor: colors.primary }}
                    onClick={() => setOpenBid(true)}
                  >
                    Place Your Bid
                  </Button>
                </div>
              )
            ) : (
              <div style={{ display: "flex", marginTop: "2.5rem" }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mx: "2rem", backgroundColor: colors.primary }}
                  onClick={() => {
                    window.location = "/login";
                  }}
                >
                  Place Your Bid
                </Button>
              </div>
            )
          ) : (
            <div></div>
          )}
          {user !== null &&
            user.userRole === "Employer" &&
            task.user &&
            task.user._id === user._id && (
              <div style={{ display: "flex", marginTop: "2.5rem" }}>
                {task.isBidding === true ? (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mx: "2rem", backgroundColor: colors.secondary }}
                    onClick={() => {
                      setOpenDeactivate(true);
                    }}
                  >
                    Close Bidding
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    sx={{ mx: "2rem" }}
                    onClick={() => {
                      setOpenDeactivate(true);
                    }}
                  >
                    Open Bidding
                  </Button>
                )}
              </div>
            )}
          <div style={{ marginTop: "3.5rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="22px"
            >
              Description
            </Typography>
            <Typography style={{ marginTop: "0.5rem" }} textAlign={"justify"}>
              {task.description}
            </Typography>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Typography
              style={{ marginRight: "1rem" }}
              fontWeight={"bold"}
              fontSize="20px"
            >
              Required Skills
            </Typography>
            <ul style={{ marginTop: "1rem" }}>
              {requiredSkills.map((skill, index) => (
                <li
                  key={index}
                  style={{ marginLeft: "-1rem", fontSize: "18px" }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Dialog open={openDeactivate} onClose={handleCloseDeactivate} fullWidth>
        <DialogTitle>
          {task !== null
            ? task.isBidding === true
              ? "Close Bidding"
              : "Open Bidding"
            : ""}
        </DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            {task !== null
              ? task.isBidding === true
                ? "Are you sure you want to close bidding?"
                : "Are you sure you want to open bidding?"
              : ""}
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDeactivate}>Cancel</Button>
            <Button onClick={handleUpdateBidding}>
              {task !== null
                ? task.isBidding === true
                  ? "Close Bidding"
                  : "Open Bidding"
                : ""}
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={openBid} onClose={handleCloseBid} fullWidth maxWidth={"md"}>
        <DialogTitle fontWeight={"bold"}>Place Your Bid</DialogTitle>
        <DialogContent>
          <AddNewBidForm task={task} onClose={handleCloseBid} user={user} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
