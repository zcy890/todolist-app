const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes
app.get("/api/todos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos ORDER BY date ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/todos", async (req, res) => {
  const { id, text, type, date } = req.body;

  if (!id || !text || !type || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await db.query(
      "INSERT INTO todos (id, text, type, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, text, type, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to insert todo" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
