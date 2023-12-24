const express = require("express");
const notes = require("./data/notes");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });
console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.json(note);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
