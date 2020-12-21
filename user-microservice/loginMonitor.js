require("dotenv").config();

const loginAttempts = [];
const EXP_TIME = process.env.LOGIN_REATTEMPT_AFTER_X_SECONDS * 1000;

function createAttempt(cnt) {
  return {
    total: cnt,
    time: new Date().getTime(),
  };
}
exports.attemptLogin = function (id) {
  const attempts = loginAttempts[id] || createAttempt(0);
  if (attempts.total >= process.env.MAX_LOGIN_ATTEMPTS) {
    if (attempts.time + EXP_TIME >= new Date().getTime()) {
      return false;
    } else {
      attempts.total = 0;
    }
  }
  loginAttempts[id] = createAttempt(++attempts.total);
  return true;
};
exports.clearAttempts = function (id) {
  loginAttempts[id] = createAttempt(0);
};
