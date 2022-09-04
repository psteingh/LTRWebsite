const db = require("../models");
const LieMedia = db.liesmedia;

// Retrieve and Sort all published Media Lies
exports.findAllPublished = (req, res) => {
  const arr = { name: 1 };

  LieMedia.find({published: true})
    .sort(arr)
    .then(data => {
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving media lies."
      });
  });
};