const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome to Board Game API");
});

app.get("/api/players", (req, res) => {
  res.sendFile(path.join(__dirname, "./dbData/players.json"));
});

app.get("/api/fields", (req, res) => {
  res.sendFile(path.join(__dirname, "./dbData/specialFields.json"));
});

app.listen(port, () => {
  console.log(`Server listen at http://localhost:${port}`);
});
