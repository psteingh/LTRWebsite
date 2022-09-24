const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve and Sort all published LtrLies
exports.findAllPublished = (req, res) => {
  // const arr = ['name'];
  // const arr = ['name', 'id', 'stuff'];
  // const arr = [];
  // const arr = []
  // arr({name: 1})
  // arr({stuff: 2});
  // arr.sort((a, b) => a.name - b.name);
  // arr.sort((a, b) => a.name.localeCompare(b.name, 'en', {
  // sensitivty: 'base' }));

  const arr = { name: 1 };
  console.log("lierboard.controller.jsA:");
  
  LtrLie.find({published: true})
    .sort(arr)
    .then(data => {
    console.log("lierboard.controller.jsB:");
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};