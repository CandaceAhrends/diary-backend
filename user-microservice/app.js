const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(
  cors({
    origin: [
      "http://candaceahrends.com",
      "http://localhost:8080",
      "http://localhost:3080",
      "https://candaceahrends.github.io",
    ],
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./routes"));

const server = app.listen(process.env.PORT || 3000, function () {
  console.log("started API on port " + server.address().port);
  console.log("login:  /user/login  post  {pwd,name}");
});
