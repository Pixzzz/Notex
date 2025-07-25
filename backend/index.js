const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config.json");
const mongoose = require("mongoose");
const Information = require("./endpoints/Information");
const User = require("./endpoints/User");
require("dotenv").config();

mongoose.connect(config.ConnectionStrings);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/information", Information);
app.use("/user", User);

app.get("/", (req, res) => {
  res.json({ data: "Welcome to NoteApp by Eleazar :)" });
});

app.listen(3000);

module.exports = app;
