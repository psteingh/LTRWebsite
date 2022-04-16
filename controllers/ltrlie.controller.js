const db = require("../models");
const { ltrlies: LtrLie, user: User } = db;

// Create and Save a new LtrLie
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create a LtrLie
  const ltrlie = new LtrLie({
    name: req.body.name,
    subject: req.body.subject,
    stuff: req.body.stuff,
    currentUser: req.body.currentUser,
    published: req.body.published ? req.body.published : false
  });
  
  // Save a LtrLie
  ltrlie.save(ltrlie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lie"
      });
    });
};

// Retrieve all LtrLies
exports.findAll = (req, res) => {
  const currentUser = req.userId;
  const name = req.query.name;
  var condition = {$and: [
          {name: {$regex: new RegExp(name), $options: "i"}},
          {currentUser} ]};

      LtrLie.find(condition)
  .then(data => {
    console.log("ltrlie.controller.js", condition);
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving all ltrlies."
    });
  });
};

// Update a LtrLie with id
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty"
      });
    }
  const id = req.params.id;
  
  LtrLie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Lie with id=${id}. Maybe Lie was not found`
          });
        } else res.send({ message: "Lie was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Lie with id=" + id
        });
      });
};

// Retrieve a LtrLie with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LtrLie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Lie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Lie with id=" + id });
    }); 
};

// Delete a LtrLie with id
exports.delete = (req, res) => {
    const id = req.params.id;

    LtrLie.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Lie with id=${id}. Maybe Lie was not found`
          });
        } else {
          res.send({
            message: "Lie was deleted successfully"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Lie with id=" + id
        });
      });
};