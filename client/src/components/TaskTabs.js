import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const TaskTabs = ({ currentTab, onChange }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Tabs
        value={currentTab}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{
          borderRadius: "20px",
          boxShadow: 1,
        }}
      >
        <Tab label="Today" value="today" />
        <Tab label="Upcoming" value="upcoming" />
      </Tabs>
    </Box>
  );
};

export default TaskTabs;
