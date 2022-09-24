const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve and Sort all published LtrLies
exports.findAllPublished = (req, res) => {
  const arr = ['name'];
  const sorted = [...arr].sort((name1, name2) => {
    return name1.localeCompare(name2, undefined, {sensitivity: 'base'});
  });

  LtrLie.find({published: true}, sorted)
    // .sort(arr)
    .then(data => {
    console.log("lierboard.controller.jsA:", data);
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};