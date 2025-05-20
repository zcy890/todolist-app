import React from "react";
import { TextField, Button, Box } from "@mui/material";

const TaskInput = ({ inputValue, onInputChange, onAdd, tab }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
      <TextField
        label={
          tab === "today"
            ? "What’s on your mind today?"
            : "Add upcoming task..."
        }
        variant="outlined"
        value={inputValue}
        onChange={onInputChange}
        fullWidth
        sx={{
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          marginRight: 1,
        }}
      />
      <Button
        variant="contained"
        onClick={onAdd}
        sx={{
          borderRadius: "20px",
          backgroundColor: "#007aff",
          color: "#ffffff",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#005bb5",
          },
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default TaskInput;
