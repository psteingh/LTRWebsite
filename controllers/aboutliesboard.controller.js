const db = require("../models");
const AboutLies = db.aboutlies;

// Retrieve and Sort all published About Lies
exports.findAllPublished = (req, res) => {
  const arr = { name: 1 };

  AboutLies.find({published: true})
    .collation({locale: "en"})
    .sort(arr)
    .then(data => {
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving about lies."
      });
  });
};