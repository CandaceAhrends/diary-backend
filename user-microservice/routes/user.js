const User = require("../models/user");
var jwt = require("jsonwebtoken");
const router = require("express").Router();
//const requestFatSecretAccess = require("./fatSecret");
require("dotenv").config();
const loginMonitor = require("../loginMonitor");
let fatSecretToken = null;

router.post("/create", function (req, res, next) {
  const pwd = req.body.pwd;
  console.log("got pwd from body ->", pwd);

  let user = new User();
  user.login = req.body.name;
  if (!user.login || !pwd) {
    return res.status(400).send({ message: "invalud user or pwd" });
  }
  user.encryptPassword(pwd);
  error = user.validateSync();
  if (error) {
    return res.status(400).send({
      message: error,
    });
  }

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.status(201).send({
        message: "User added successfully.",
      });
    }
  });
});
router.get("/logout", function (req, res, next) {
  res.setHeader("Authorization", null);

  return res.status(201).send({
    message: "User Logged Out",
  });
});

router.get("/verify", function (req, res, next) {
  jwt.verify(
    extractToken(req),
    process.env.AUTH_SECRET,
    { algorithms: [process.env.AUTH_ALGORITHM] },
    function (err, payload) {
      console.log("payload ", err, payload);
      res.json(err || payload);
    }
  );
});

router.post("/login", function (req, res, next) {
  const fromIp = req.connection.localAddress;

  const allowLogin = loginMonitor.attemptLogin(req.body.name);
  console.log(
    "log in req from user  allowed =  " + allowLogin,
    req.body.name,
    fromIp
  );
  if (!allowLogin) {
    return res.status(200).send({
      message: "Too many login attempts",
    });
  } else {
    User.findOne({ login: req.body.name }, (err, user) => {
      console.log("login attempt: ", req.body.name, user);
      if (user === null) {
        return res.status(200).send({
          message: "User not found.",
        });
      } else {
        if (user.validPassword(req.body.pwd)) {
          const token = generateToken(req.body.name);

          res.setHeader("Authorization", "Bearer " + token);
          return res.status(201).send({
            message: "User Logged In",
            success: true,
          });
        } else {
          return res.status(400).send({
            message: "User not Logged In",
            success: false,
          });
        }
      }
    });
  }
});

function generateToken(user) {
  const jwtKey = process.env.AUTH_SECRET;
  const payLoad = { user };
  return jwt.sign(payLoad, jwtKey, {
    algorithm: process.env.AUTH_ALGORITHM,
    expiresIn: process.env.TOKEN_EXP,
  });
}
async function getFatSecretToken() {
  if (!fatSecretToken) {
    console.log("getting a new token @@@@@@@@@");
    const securityResponse = await requestFatSecretAccess();
    fatSecretToken = securityResponse.access_token;
  }
  return fatSecretToken;
}

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
module.exports = router;
