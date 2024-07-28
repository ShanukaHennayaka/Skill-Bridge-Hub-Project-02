/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import YourInfo from "./YourInfo";
import TaskPosts from "./TaskPosts";
import EmployerBids from "../Bid/EmployerBids";
import ProfessionalBids from "../Bid/ProfessionalBids";
import JobManagement from "./JobManagement";

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

export default function OtherSections({ user = null, getUser, getNumOfPosts }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="Your Info" {...a11yProps(0)} />
          {user.userRole === "Professional" && (
            <Tab label="My Bids" {...a11yProps(1)} />
          )}

          <Tab label="Job Management" {...a11yProps(2)} />
          {user.userRole === "Employer" && (
            <Tab label="Task Posts" {...a11yProps(3)} />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <YourInfo user={user} getUser={getUser} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {user.userRole === "Professional" && <ProfessionalBids user={user} />}
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={user.userRole === "Professional" ? 2 : 1}
      >
        <JobManagement user={user} />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={user.userRole === "Professional" ? 3 : 2}
      >
        <TaskPosts user={user} getNumOfPosts={getNumOfPosts} />
      </CustomTabPanel>
    </Box>
  );
}
