import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const TaskList = ({ tasks, onDelete, tab }) => {
  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMMM D, YYYY"); // e.g., May 20, 2025
  };

  const getDaysOverdue = (dateString) => {
    const taskDate = dayjs(dateString);
    const today = dayjs();
    return today.diff(taskDate, "day");
  };

  const getTabTitle = () => {
    if (tab === "past") {
      return "Past Tasks";
    } else if (tab === "upcoming") {
      return "Upcoming Tasks";
    } else {
      return "Today's Tasks";
    }
  };

  const getEmptyMessage = () => {
    if (tab === "past") {
      return "No past tasks found. Great job staying on top of things! 🎉";
    } else if (tab === "upcoming") {
      return "No upcoming tasks scheduled.";
    } else {
      return "No tasks for today. Add one above to get started!";
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {getTabTitle()}
      </Typography>
      {tasks.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#666",
            fontStyle: "italic",
            padding: 3,
          }}
        >
          {getEmptyMessage()}
        </Typography>
      ) : (
        <List>
          {tasks.map((todo) => {
            const isOverdue = tab === "past";
            const daysOverdue = isOverdue ? getDaysOverdue(todo.date) : 0;

            return (
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
                  backgroundColor: isOverdue ? "#ffebee" : "#f5f5f5",
                  boxShadow: 1,
                  border: isOverdue ? "1px solid #ffcdd2" : "none",
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>{todo.text}</span>
                      {isOverdue && (
                        <Chip
                          label={`${daysOverdue} day${
                            daysOverdue !== 1 ? "s" : ""
                          } overdue`}
                          color="error"
                          size="small"
                          sx={{ fontSize: "0.75rem" }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    tab === "past"
                      ? `Was due: ${formatDate(todo.date)}`
                      : `Due: ${formatDate(todo.date)}`
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default TaskList;
