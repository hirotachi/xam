const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const router = require("./router");
const cors = require("cors");

const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost:27018/xam";
mongoose.connect(databaseUrl, {useNewUrlParser: true, useCreateIndex: true});
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
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