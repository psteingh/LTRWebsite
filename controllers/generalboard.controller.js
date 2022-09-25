const db = require("../models");
const LieGeneral = db.liesgeneral;

// Retrieve and Sort all published General Lies
exports.findAllPublished = (req, res) => {
  const arr = { title: 1 };

  LieGeneral.find({published: true})
    .collation({locale: "en"})
    .sort(arr)
    .then(data => {
    res.send(data);
    })

  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving general lies."
      });
  });
};