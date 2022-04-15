const db = require("../models");
const { ltrlies: LtrLie, user: User } = db;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {

  LtrLie.find({published: true})
  .then(data => {
    
    console.log("lb");

    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });

};