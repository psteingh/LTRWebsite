const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve and Sort all published LtrLies
exports.findAllPublished = (req, res) => {
  // const arr = [ 'name', 'subject', 'stuff'];

  const arr = ['stuff'];
  const sorted = arr.sort((a, b) => 
    a.localeCompare(b));
  
  LtrLie.find({published: true}, sorted)
    
    .then(data => {
    console.log("lierboard.controller.jsA:");
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};