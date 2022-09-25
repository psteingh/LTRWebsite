const db = require("../models");
const { musings: Musings, user: User } = db;

// Create and Save a new Musings
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create a Musings
  const musings = new Musings({
    title: req.body.title,
    middle: req.body.middle,
    bottom: req.body.bottom,
    currentUser: req.body.currentUser,
    published: req.body.published ? req.body.published : false
  });
  
  // Save a Musings
  musings.save(musings)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Musings"
      });
    });
};

// Retrieve and Sort all Musings
exports.findAll = (req, res) => {
  const arr = { title: 1};
  const currentUser = req.userId;
  const title = req.query.title;
  var condition = {$and: [
          {title: {$regex: new RegExp(title), $options: "i"}},
          {currentUser} ]};

      Musings.find(condition)
  .collation({locale: "en"})
  .sort(arr)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving all musings."
    });
  });
};

// Update a Musings with id
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty"
      });
    }
  const id = req.params.id;
  
  Musings.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Musings with id=${id}. Maybe Musings was not found`
          });
        } else res.send({ message: "Musings was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Musings with id=" + id
        });
      });
};

// Retrieve a Musings with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Musings.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Musings not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Musings with id=" + id });
    }); 
};

// Delete a Musings with id
exports.delete = (req, res) => {
    const id = req.params.id;

    Musings.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Musings with id=${id}. Maybe Musings was not found`
          });
        } else {
          res.send({
            message: "Musings was deleted successfully"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Musings with id=" + id
        });
      });
};