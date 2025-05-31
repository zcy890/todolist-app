const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/todos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos ORDER BY date ASC");
    res.json(result.rows);
    console.log("Fetched todos:", result.rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/todos", async (req, res) => {
  const { id, text, type, date } = req.body;
  console.log("POST /api/todos - received body:", req.body);

  if (!id || !text || !type || !date) {
    console.warn("Missing fields in request body");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await db.query(
      "INSERT INTO todos (id, text, type, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, text, type, date]
    );
    console.log("Inserted todo:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting todo:", err);
    res.status(500).json({ error: "Failed to insert todo" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  console.log(`PUT /api/todos/${id} - received body:`, req.body);

  if (!text) {
    console.warn("Missing text field in request body");
    return res.status(400).json({ error: "Text field is required" });
  }

  try {
    const result = await db.query(
      "UPDATE todos SET text = $1 WHERE id = $2 RETURNING *",
      [text, id]
    );

    if (result.rows.length === 0) {
      console.warn(`Todo with id ${id} not found`);
      return res.status(404).json({ error: "Todo not found" });
    }

    console.log("Updated todo:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error updating todo with id ${id}:`, err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
    console.log(`Deleted todo with id: ${id}`);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error(`Error deleting todo with id ${id}:`, err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
