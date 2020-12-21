const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//require("dotenv").config();

const Imap = require("imap");
const nodemailer = require("nodemailer");


const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'./public'));

app.get("/mail", (req,res)=>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'candy.ahrends@gmail.com', // generated ethereal user
          pass: 'Can!Lor!377', // generated ethereal password
        },
      });
      const mailOptions = {
        from: 'candy.ahrends@gmail.com',
        to: 'candace.ahrends@me.com',
        subject: 'Success due',
        html: '<p style="color:green">test</p> <p>place holder </p>Embedded image: <img src="cid:unique@nodemailer.com"/>',
        attachments: [{
            filename: 'image.png',
            path: __dirname +'/public/brad.png',
            cid: 'unique@nodemailer.com' 
        }]
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(201).send({
        message: "emailed successfully.",
      });


});


const server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});