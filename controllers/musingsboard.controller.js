const db = require("../models");
const Musings = db.musings;

// Retrieve and Sort all published Musings
exports.findAllPublished = (req, res) => {
  const arr = { title: 1 };

  Musings.find({published: true})
    .collation({locale: "en"})
    .sort(arr)
    .then(data => {
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving musings."
      });
  });
};