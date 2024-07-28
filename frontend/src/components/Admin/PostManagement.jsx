import { useEffect, useState } from "react";
import { GetAllTasks } from "../../service/taskService";
import colors from "../../assets/colors";
import {
  alpha,
  Box,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import TaskCard from "../Task/TaskCard";
import { getCurrentUser } from "../../service/userService";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "15px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  height: "3rem",
  display: "flex",
  alignItems: "center",
  border: `2px solid ${colors.primary}`,
  width: "50vh",
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30vh",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

export default function PostManagement() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchResult, setSearchResult] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchAllTasks = async () => {
    await GetAllTasks()
      .then(({ data }) => {
        setFilteredTasks(data)
        setTasks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [user, setUser] = useState(null);
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

  const handleCategoryChange = (e) => {
    if(e.target.value !== "all"){
      const afterFilterTasks = tasks.filter(
        (cf) => cf.mainCategory === e.target.value
      );
      setFilteredTasks(afterFilterTasks);
    }else {
    setFilteredTasks(tasks);
    }
    setCategory(e.target.value);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 2rem 0 2rem",
        }}
      >
        <FormControl size="small">
          <Select value={category} onChange={handleCategoryChange}>
            <MenuItem selected value="all">
              All
            </MenuItem>
            <MenuItem value="Professional Services">
              Professional Services
            </MenuItem>
            <MenuItem value="Domestic Services">Domestic Services</MenuItem>
            <MenuItem value="Hospitality and Lifestyle Services">
              Hospitality and Lifestyle Services
            </MenuItem>
          </Select>
        </FormControl>
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
      </div>
      <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 16 }}
        >
          {filteredTasks.length !== 0 ? (
            filteredTasks.reverse().map((task, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <TaskCard
                  task={task}
                  isAdmin={user.userRole === "Admin"}
                  reloadTasks={fetchAllTasks}
                />
              </Grid>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "20%",
              }}
            >
              <Typography fontSize={"20px"}>No tasks available.</Typography>
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
}
