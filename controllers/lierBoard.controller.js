const db = require("../models");
const LtrLie = db.ltrlies;

console.log("lierboard.controller.js above");

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {
  // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({ message: "Content can not be empty" });
  //   return;
  // }

  // const currentUser = req.userId;
  // const name = req.query.name;
  // var condition = {$and: [
  //         {name: {$regex: new RegExp(name), $options: "i"}},
  //         {currentUser} ]};
  
  LtrLie.find()
  .then(data => {
    
    console.log("lierboard.controller.js");

    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });

};