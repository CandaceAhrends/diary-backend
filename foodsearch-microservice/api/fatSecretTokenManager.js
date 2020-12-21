const requestFatSecretAccess = require("./fatSecrettokenRequester");

const TokenManager = {
  //token: `eyJhbGciOiJSUzI1NiIsImtpZCI6IjEzRTFGRDgwMTQ0Q0IwQTI4NDRFMzI4REZCNUU4NTQyRDE0QUI2RUYiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJFLUg5Z0JSTXNLS0VUaktOLTE2RlF0Rkt0dTgifQ.eyJuYmYiOjE2MDgzNDcyMTYsImV4cCI6MTYwODQzMzYxNiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiJmOWZiMGUzNDY0Mjg0MDM3ODEzZjFiZTNkOTQyMzViOCIsInNjb3BlIjpbImJhc2ljIl19.A3T4Ay_QW6bBMj2MxA49-dH5EV80Mx7XWcKxje47YEfYOGN2Y5e1BzjVxYitjadCOuUj3V1cjvDVK8WQz-PiqBXpxBtm7WthgQRVEnu1NF0kPgflAyW6QF6cblSEvf113JITO86wuGIl0msAcm80a1eQIYIEbEBr59WZ4CxTpzrJfbJQU3-so7KMHxnjHLX_bYimPFIfedQJPKjWTB46RhHUqPvqW4OR9Gy1kBX5mJWyLgtPwYk1fNlPgBPWnU-inF-r1cc-6yHWBvstYD_eQEt9ivmMW9Aujx1jF_cqwLtYJ6o78OwM8JNR47IHB0Ch_Hi3j1bfI9DVUZ--WsB4Bw`,
  expire: new Date().getTime(),
  token: null,

  getToken: async function () {
    return isExpired(this.expire) ? await this.restoreToken() : await this.token;
  },
  restoreToken: async function () {
    const { access_token, expires_in } = await getFatSecretToken();
    this.token = access_token;
    this.expire = (expires_in * 1000) + new Date().getTime();
    console.log('getting new token and expire >> ', 86400, this.expire);

    return this.token;
  }

}

function isExpired(expire) {
  const now = new Date().getTime();
  console.log("now is ", now, expire, now > expire);
  return now > expire;
}

async function getFatSecretToken() {

  console.log("getting a new token @@@@@@@@@");
  const securityResponse = await requestFatSecretAccess();
  return securityResponse;
}

module.exports = TokenManager;