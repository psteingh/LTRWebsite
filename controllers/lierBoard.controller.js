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

exports.sortAllPublished = (req, res) => {
  const name = req.body.name;

  LtrLie.sort(name, req.body, (a, b) => a.name.localCompare(b.name))
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