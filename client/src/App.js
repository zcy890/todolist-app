import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TaskTabs from "./components/TaskTabs";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CalendarPicker from "./components/CalendarPicker";
import "./App.css";
import Footer from "./components/Footer";

const API = "https://todolist-backend-bk7s.onrender.com/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("today");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched todos:", data);
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.warn("Expected array, got:", data);
          setTodos([]); // fallback
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
      date: selectedDate.toDate().toISOString().split("T")[0], // This avoids UTC shift
    };
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    setTodos((prev) => (Array.isArray(prev) ? [...prev, data] : [data]));
    setInput("");
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const today = dayjs().startOf("day");

  const filteredTodos = Array.isArray(todos)
    ? todos
        .filter((todo) => {
          const todoDate = dayjs(todo.date).startOf("day");
          if (tab === "today") {
            return todo.type === "today" && todoDate.isSame(today, "day");
          } else if (tab === "upcoming") {
            return todoDate.isAfter(today, "day");
          } else if (tab === "past") {
            return todoDate.isBefore(today, "day");
          }
          return false;
        })
        .sort((a, b) => {
          // For past tasks, sort by most recent first (descending order)
          if (tab === "past") {
            return dayjs(b.date).diff(dayjs(a.date));
          }
          // For today and upcoming, sort by earliest first (ascending order)
          return dayjs(a.date).diff(dayjs(b.date));
        })
    : [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <TaskList tasks={filteredTodos} onDelete={deleteTodo} tab={tab} />
        </Box>
      </Container>
      <Footer />
    </LocalizationProvider>
  );
}

export default App;
