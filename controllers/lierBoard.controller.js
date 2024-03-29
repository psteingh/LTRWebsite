const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve and Sort all published LtrLies
exports.findAllPublished = (req, res) => {
  const arr = { name: 1 };
  
  LtrLie.find({published: true})
    .collation({locale: "en"})
    .sort(arr)
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