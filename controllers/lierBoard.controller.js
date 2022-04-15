const db = require("../models");
const LtrLie = db.ltrlies;

console.log("lierboard.controller.js above");

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {
  
  LtrLie.find({ published: true })
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