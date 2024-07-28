import { Box, Grid, Typography } from "@mui/material";
import "./ProfessionalServicesPage.css";
import Filter from "../components/ServiceCategory/Filter";
import { useEffect, useState } from "react";
import { GetAllTaskByCategory } from "../service/taskService";
import TaskCard from "../components/Task/TaskCard";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";

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

export default function ServicesByCategoryPage() {
  let category = "";
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const getFilters = (filters) => {
    let newFilteredTasks = [...tasks];
    if (
      filters.filterCategories.length === 0 &&
      filters.priceFilter === null &&
      filters.locationFilter === ""
    )
    
      return setFilteredTasks(newFilteredTasks);

    if ([...filters.filterCategories].length !== 0) {
      newFilteredTasks = newFilteredTasks.filter((cf) =>
        [...filters.filterCategories].includes(cf.subCategory)
      );
    }
    if (filters.priceFilter !== null) {
      newFilteredTasks = newFilteredTasks.filter(
        (pf) =>
          parseInt(filters.priceFilter.minPrice) < parseInt(pf.budget) &&
          parseInt(pf.budget) < parseInt(filters.priceFilter.maxPrice)
      );
    }
    if (filters.locationFilter !== "") {
      newFilteredTasks = newFilteredTasks.filter((lf)=> lf.location === filters.locationFilter)
    }
    setFilteredTasks(newFilteredTasks);
  };

  const resetFilter =()=>{
    setFilteredTasks(tasks);
  }

  const handleSearchChange = (e)=>{
    let searchFiltered = tasks.filter((sf) =>
      JSON.stringify(sf)
        .toLowerCase()
        .includes((e.target.value + "").toLowerCase())
    );
    setFilteredTasks(searchFiltered);
    setSearchResult(e.target.value)
  }

  const fetchAllTasks = async () => {
    await GetAllTaskByCategory(category)
      .then(({ data }) => {
        setTasks(data.filter((t) => t.isBidding));
        setFilteredTasks(data.filter((t) => t.isBidding));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (location.pathname === "/professional-services") {
    category = "Professional Services";
  }
  if (location.pathname === "/domestic-services") {
    category = "Domestic Services";
  }
  if (location.pathname === "/hospitality-and-lifestyle-services") {
    category = "Hospitality and Lifestyle Services";
  }
  return (
    <div style={{ margin: "2rem" }}>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          {category}
        </Typography>
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
      <div className="ps-container">
        <div className="ps-filter">
          <Filter
            category={category}
            getFilters={getFilters}
            resetFilter={resetFilter}
          />
        </div>
        <div className="ps-items">
          <Box
            sx={{
             
              paddingTop: "0rem",
              display: "flex",

              justifyContent: "center",
            }}
          >
            <Grid container spacing={2}>
              {filteredTasks.length !== 0 ? (
                filteredTasks.map((task, index) => (
                  <Grid item xs={8} sm={6} md={4} key={index}>
                    <TaskCard task={task} />
                  </Grid>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20%",
                  }}
                >
                  <Typography fontSize={"25px"}>No Tasks Available</Typography>
                </div>
              )}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}
