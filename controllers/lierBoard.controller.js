const db = require("../models");
const { ltrlies: LtrLie } = db;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {
  
  LtrLie.find()
  .then(data => {
    
    console.log("lierboard.controller.js");

    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });

};