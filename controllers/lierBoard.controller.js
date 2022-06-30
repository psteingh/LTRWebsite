const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {
  const arr = [{ name: req.query.name }];

  LtrLie.find({published: true},
    arr.sort((a, b) => a.name - b.name))

    .then(data => {
      console.log(arr);
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};  