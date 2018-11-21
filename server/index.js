const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const router = require("./router");

mongoose.connect("mongodb://localhost:27017/xam", {useNewUrlParser: true, useCreateIndex: true});

const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({
  extended: false
}));
router(app);
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


app.listen(port, () => {
  console.log("Server is up");
});