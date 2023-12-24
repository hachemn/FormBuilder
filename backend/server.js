const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const notes = require("./data/notes");
dotenv.config({ path: __dirname + "/.env" });
console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = require("./config/db");
connectDB();

const db = mongoose.connection;
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/notes", (req, res) => {
  console.log(notes); // Add this line
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
