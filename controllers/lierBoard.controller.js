const { ltrlies } = require("../models");
const db = require("../models");
const { ltrlies: LtrLie, user: User } = db;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {
  LtrLie.find({ })
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