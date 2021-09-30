const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

var Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    validate: [
      {
        validator: function (v) {
          return /^\w+$/.test(v);
        },
        message: (props) => `${process.env.INVALID_USER_ERROR}`,
      },
      {
        validator: function (v) {
          console.log(v, v.length);
          return v.lenght < 10 || v.length > 3;
        },
        message: (props) => `${process.env.INVALID_USER_LENGTH}`,
      },
    ],
  },
  hash: String,
  salt: String,
});

UserSchema.methods.encryptPassword = function (pwd) {
  this.salt = crypto.randomBytes(256).toString("hex");
  this.hash = generateHash(pwd, this.salt);
};
UserSchema.methods.validPassword = function (pwd) {
  const hash = generateHash(pwd, this.salt);

  return this.hash === hash;
};

function generateHash(pwd, salt) {
  return crypto.pbkdf2Sync(pwd, salt, 1000, 512, `sha512`).toString(`hex`);
}
const User = (module.exports = mongoose.model("dietapp_appuser", UserSchema));
