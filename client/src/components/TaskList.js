import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";

const TaskList = ({ tasks, onDelete, onUpdate, tab }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMMM D, YYYY"); // e.g., May 20, 2025
  };

  const getDaysOverdue = (dateString) => {
    const taskDate = dayjs(dateString);
    const today = dayjs();
    return today.diff(taskDate, "day");
  };

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = async (id) => {
    if (editText.trim() && editText !== tasks.find((t) => t.id === id)?.text) {
      await onUpdate(id, editText.trim());
    }
    setEditingId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleEditSave(id);
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
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
            const isEditing = editingId === todo.id;
            const canEdit = tab === "today" || tab === "upcoming";

            return (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {canEdit && !isEditing && (
                      <IconButton
                        edge="end"
                        onClick={() => handleEditStart(todo)}
                        sx={{
                          backgroundColor: "rgba(25, 118, 210, 0.08)",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.12)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {isEditing && (
                      <>
                        <IconButton
                          edge="end"
                          onClick={() => handleEditSave(todo.id)}
                          sx={{
                            backgroundColor: "rgba(46, 125, 50, 0.08)",
                            "&:hover": {
                              backgroundColor: "rgba(46, 125, 50, 0.12)",
                            },
                          }}
                        >
                          <SaveIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={handleEditCancel}
                          sx={{
                            backgroundColor: "rgba(211, 47, 47, 0.08)",
                            "&:hover": {
                              backgroundColor: "rgba(211, 47, 47, 0.12)",
                            },
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    )}
                    <IconButton edge="end" onClick={() => onDelete(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pr: canEdit ? 12 : 6,
                      }}
                    >
                      {isEditing ? (
                        <TextField
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, todo.id)}
                          variant="outlined"
                          size="small"
                          fullWidth
                          autoFocus
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      ) : (
                        <>
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
                        </>
                      )}
                    </Box>
                  }
                  secondary={
                    !isEditing &&
                    (tab === "past"
                      ? `Was due: ${formatDate(todo.date)}`
                      : `Due: ${formatDate(todo.date)}`)
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
