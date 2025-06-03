import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  format,
  parseISO,
  startOfDay,
  isAfter,
  isBefore,
  isSameDay,
} from "date-fns";
import TaskTabs from "./components/TaskTabs";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CalendarPicker from "./components/CalendarPicker";
import "./App.css";
import Footer from "./components/Footer";

const API = "https://todolist-backend-bk7s.onrender.com/api/todos";

// Helper function to format date in local timezone
const formatDateLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("today");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Use native Date object

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched todos:", data);
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.warn("Expected array, got:", data);
          setTodos([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setTodos([]);
      });
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    const newTodo = {
      id: uuidv4(),
      text: input,
      type: tab,
      date: formatDateLocal(selectedDate), // Use timezone-safe formatting
    };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data = await res.json();
      setTodos((prev) => (Array.isArray(prev) ? [...prev, data] : [data]));
      setInput("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const updateTodo = async (id, updatedText) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: updatedText }),
      });
      const updatedTodo = await res.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Get today's date at start of day for consistent comparisons
  const today = startOfDay(new Date());

  const filteredTodos = Array.isArray(todos)
    ? todos
        .filter((todo) => {
          // Parse the stored date string and normalize to start of day
          const todoDate = startOfDay(parseISO(todo.date));

          if (tab === "today") {
            return isSameDay(todoDate, today);
          } else if (tab === "upcoming") {
            return isAfter(todoDate, today);
          } else if (tab === "past") {
            return isBefore(todoDate, today);
          }
          return false;
        })
        .sort((a, b) => {
          const dateA = parseISO(a.date);
          const dateB = parseISO(b.date);

          // For past tasks, sort by most recent first (descending order)
          if (tab === "past") {
            return dateB - dateA;
          }
          // For today and upcoming, sort by earliest first (ascending order)
          return dateA - dateB;
        })
    : [];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "#f8f8f7",
            borderRadius: "20px",
            boxShadow: 3,
            padding: 3,
            marginTop: 5,
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            ✅ To-Do List
          </Typography>
          {/* Only show calendar picker for today and upcoming tabs */}
          {tab !== "past" && (
            <CalendarPicker
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          )}
          <TaskTabs currentTab={tab} onChange={handleTabChange} />
          {/* Only show task input for today and upcoming tabs */}
          {tab !== "past" && (
            <TaskInput
              inputValue={input}
              onInputChange={(e) => setInput(e.target.value)}
              onAdd={addTodo}
              tab={tab}
            />
          )}
          <TaskList
            tasks={filteredTodos}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            tab={tab}
          />
        </Box>
      </Container>
      <Footer />
    </LocalizationProvider>
  );
}

export default App;
