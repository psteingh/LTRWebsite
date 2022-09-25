const db = require("../models");
const LieBible = db.liesbible;

// Retrieve and Sort all published Bible Lies
exports.findAllPublished = (req, res) => {
  const arr = { name: 1 };

  LieBible.find({published: true})
    .collation({locale: "en"})
    .sort(arr)
    .then(data => {
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving bible lies."
      });
  });
};