const db = require("../models");
const AboutUs = db.aboutus;

// Retrieve and Sort all published About Us
exports.findAllPublished = (req, res) => {
  const arr = { name: 1 };

  AboutUs.find({published: true})
    .sort(arr)
    .then(data => {
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving about us."
      });
  });
};