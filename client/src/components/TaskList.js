import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const TaskList = ({ tasks, onDelete }) => {
  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMMM D, YYYY"); // e.g., May 20, 2025
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Tasks for{" "}
        {tasks.length > 0 ? formatDate(tasks[0].date) : "Selected Date"}
      </Typography>
      <List>
        {tasks.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => onDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            }
            sx={{
              marginBottom: 1,
              padding: 2,
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
              boxShadow: 1,
            }}
          >
            <ListItemText
              primary={todo.text}
              secondary={`Due: ${formatDate(todo.date)}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TaskList;
