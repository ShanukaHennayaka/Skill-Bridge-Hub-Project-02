/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from "@mui/material";
import ImageSlider from "../components/ImageSlider";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import colors from "../assets/colors";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../components/Task/TaskCard";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../service/userService";
import { GetAllTasks } from "../service/taskService";
import { GetAllNotifications } from "../service/notificationService";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "15px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: "20%",
  marginLeft: "20%",
  height: "3.5rem",
  display: "flex",
  alignItems: "center",
  marginTop: "2rem",
  border: `3px solid ${colors.primary}`,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function HomePage({ setUser, setNotificationCount }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const fetchAllTasks = async () => {
    await GetAllTasks()
      .then(({ data }) => {
        const tasks = [...data].reverse().filter((t)=>t.isBidding)
        setTasks(tasks);
        setFilteredTasks(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        await GetAllNotifications(user._id)
          .then(({ data }) => {
            setNotificationCount(data.length);
          })
          .catch((err) => {
            console.log(err);
          });
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    fetchAllTasks();
  }, []);

  const handleSearchChange = (e) => {
    let searchFiltered = tasks.filter((sf) =>
      JSON.stringify(sf)
        .toLowerCase()
        .includes((e.target.value + "").toLowerCase())
    );
    setFilteredTasks(searchFiltered);
    setSearchResult(e.target.value);
  };
  return (
    <Box sx={{ padding: "1rem" }}>
      <ImageSlider />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchResult}
          onChange={handleSearchChange}
        />
      </Search>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "2rem",
        }}
      >
        <Card
          style={{
            height: "150px",
            padding: "1rem",
            cursor: "pointer",
            backgroundColor: "#82daff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => (window.location = "/professional-services")}
          >
            <div>
              <AppRegistrationIcon
                fontSize="large"
                style={{ color: colors.secondary }}
              />
            </div>
            <br />
            <br />
            <strong>Professional Services</strong>
          </div>
        </Card>
        <Card
          style={{
            height: "150px",
            padding: "1rem",
            cursor: "pointer",
            backgroundColor: "#82daff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => (window.location = "/domestic-services")}
          >
            <div>
              <MapsHomeWorkIcon
                fontSize="large"
                style={{ color: colors.secondary }}
              />
            </div>
            <br />
            <br />
            <strong> Domestic Services</strong>
          </div>
        </Card>
        <Card
          style={{
            height: "150px",
            padding: "1rem",
            cursor: "pointer",
            backgroundColor: "#82daff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() =>
              (window.location = "/hospitality-and-lifestyle-services")
            }
          >
            <div>
              <NightlifeIcon
                fontSize="large"
                style={{ color: colors.secondary }}
              />
            </div>

            <strong> Hospitality</strong>
            <strong> &</strong>
            <strong>Lifestyle Services</strong>
          </div>
        </Card>
      </div>
      <div style={{ margin: "2rem", marginTop: "3rem" }}>
        <div
          style={{
            backgroundColor: colors.secondary,
            padding: "1rem",
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={"bold"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FontAwesomeIcon
              icon={faListCheck}
              style={{ marginRight: "1rem", fontSize: "1.5rem" }}
            />{" "}
            Recent Tasks
          </Typography>
        </div>
      </div>
      <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 16 }}
        >
          {filteredTasks.map((task, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
