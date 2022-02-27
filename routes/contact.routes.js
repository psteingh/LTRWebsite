const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

const transporter = nodemailer.createTransport({
    host: "liestoremember.com", //replace with your email provider
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  // verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log();
    }
  });

  app.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
  
    var mail = {
      from: name,
      to: process.env.EMAIL, // receiver email,
      subject: subject,
      text: message
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({ messStatus: 'fail' })
      } else {
        res.json({ messStatus: 'Message sent' })
      }
 
    })
  })
}