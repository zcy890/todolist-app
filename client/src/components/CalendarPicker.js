import React from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const CalendarPicker = ({ selectedDate, onDateChange }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={onDateChange}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="YYYY-MM-DD"
        sx={{
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: 1,
        }}
      />
    </Box>
  );
};

export default CalendarPicker;
