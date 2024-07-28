/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TaskDetails from "../components/Task/ProfileTask/TaskDetails";
import EmployerBids from "../components/Bid/EmployerBids";
import Suggestions from "../components/Bid/Suggestions";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TaskOwnerDetailsPage({user}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", margin: "1rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Task Details" {...a11yProps(0)} />
          <Tab label="Bid Details" {...a11yProps(1)} />
          <Tab label="Qualified Bidders" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TaskDetails user={user} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EmployerBids user={user} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Suggestions user={user} />
      </CustomTabPanel>
    </Box>
  );
}
