var request = require("request");
require("dotenv").config();

var options = {
    method: 'POST',
    url: 'https://oauth.fatsecret.com/connect/token',
    method: 'POST',
    auth: {
        user: process.env.FAT_ID,
        password: process.env.FAT_SECRET
    },
    headers: { 'content-type': 'application/json' },
    form: {
        'grant_type': 'client_credentials',
        'scope': 'basic'
    },
    json: true
};

module.exports =  function requestFatSecretAccess() {
    console.log("auth ", options);
    return new Promise((resolve, reject) => {

        request(options, function (error, response, body) {
            if (error) reject(error);
            resolve(body);

            console.log(body);

        });
    });

}