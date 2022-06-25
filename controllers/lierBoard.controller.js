const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {

  LtrLie.find({published: true})
  .then(data => {
    
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};

// Sort all published LtrLies
exports.sortAllPublished = (req, res) => {
  const name = req.query.name;

  LtrLie.sort(function (a, b) {return b-a})
  .then(data => {
    console.log(LtrLie.sort);
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};