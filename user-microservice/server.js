const express = require("express");
const path = require("path");
require("dotenv").config();
const port = 8080;
const app = express();
app.use(express.static("./public"));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(port, function () {
  console.log("Server running on port " + port);
});
