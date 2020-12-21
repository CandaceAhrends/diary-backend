const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(
  cors({
    origin: ["http://candaceahrends.com", "http://localhost:9000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var verifyToken = function (req, res, next) {
  const token = extractToken(req);
 // console.log("token extracted => ", token);
  res.setHeader("Authorization", "Bearer " + token);
  
  next();
}

app.use(verifyToken);
app.use(require("./routes"));

const server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});

function extractToken(req) {
  const authHeader = req.headers.authorization || "";
  const tokenRegEx = /^Bearer\s(.+)/;
  const tokenMatch = authHeader.match(tokenRegEx);
  if (tokenMatch) {
    const [, token] = tokenMatch;
    return token;
  }
  return null;
}
