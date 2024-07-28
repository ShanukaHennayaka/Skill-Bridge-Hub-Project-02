/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { cities } from "../../assets/countries";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ps = ["IT specialists", "Education Services", "Event Planning Services"];
const ds = [
  "Home Services",
  "Child Care Services",
  "Pet Care Services",
  "Transportation Services",
];
const hls = ["Food and Beverage Services", "Health and Fitness Services"];

export default function Filter({ category, getFilters, resetFilter }) {
  const [checked, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [selectedLocation, setSelectedLocation] = useState("");

  const handlePriceFilter = (e) => {
    const { name, value } = e.target;
    setPriceFilter({ ...priceFilter, [name]: value });
  };
  useEffect(() => {
    if (category === "Professional Services") {
      setCategories(ps);
    }
    if (category === "Domestic Services") {
      setCategories(ds);
    }
    if (category === "Hospitality and Lifestyle Services") {
      setCategories(hls);
    }
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSendFilters = () => {
    let filters = {
      filterCategories: [...checked],
      priceFilter: priceFilter,
      locationFilter: selectedLocation,
    };

    if (priceFilter.minPrice === 0 && priceFilter.maxPrice === 0) {
      filters.priceFilter = null;
    }
    getFilters(filters);
  };

  const handleReset = ()=>{

    setChecked([])
    setPriceFilter({
      minPrice: 0,
      maxPrice: 0,
    });
    setSelectedLocation("")
    resetFilter()
  }

  return (
    <div style={{ border: "1px solid", padding: "1rem", maxWidth:'330px' }}>
      <div>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={"-0.5rem"}>
          Filter By Category
        </Typography>
        <hr />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {categories.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <Typography id={labelId} fontSize="18px">
                    {value}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
      <br />
      <div>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={"-0.5rem"}>
          Filter By Price
        </Typography>
        <hr />
        <div style={{ display: "flex", alignItems: "center", margin: "1rem" }}>
          <TextField
            label="Min"
            size="small"
            type="number"
            name="minPrice"
            value={priceFilter.minPrice}
            onChange={handlePriceFilter}
          />
          <div style={{ margin: "1rem" }}>-</div>
          <TextField
            label="Max"
            size="small"
            type="number"
            name="maxPrice"
            value={priceFilter.maxPrice}
            onChange={handlePriceFilter}
          />
        </div>
      </div>

      <div>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={"-0.5rem"}>
          Filter By Location
        </Typography>
        <hr />
        <div>
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="countries">Location</InputLabel>
            <Select
              labelId="countries"
              label="Location"
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {cities.map((country, i) => (
                <MenuItem key={i} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="outlined"
          color="success"
          startIcon={<FilterAltIcon />}
          sx={{ marginBottom: "1rem" }}
          onClick={handleSendFilters}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RestartAltIcon />}
          sx={{ marginBottom: "1rem" }}
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
