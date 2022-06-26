const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {

  LtrLie.find({published: true})
  .then(data => {
    // console.log(data);

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
  // const arr = { name: req.body.name };
  
  LtrLie.find({sort: {name: req.body.name}})
  .then(data => {
    console.log(data);

    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};