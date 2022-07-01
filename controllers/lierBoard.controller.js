const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {
  const arr = { name: 1 };

  LtrLie.find({published: true})
    .sort(arr)
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