const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const router = require("./router");

const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up");
});