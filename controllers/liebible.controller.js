const db = require("../models");
const { liesbible: LieBible, user: User } = db;

// Create and Save a new LieBible
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create a LieBible
  const liebible = new LieBible({
    title: req.body.title,
    middle: req.body.middle,
    bottom: req.body.bottom,
    currentUser: req.body.currentUser,
    published: req.body.published ? req.body.published : false
  });
  
  // Save a LieBible
  liebible.save(liebible)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bible Lie"
      });
    });
};

// Retrieve and Sort all LieBibles
exports.findAll = (req, res) => {
  const arr = { title: 1};
  const currentUser = req.userId;
  const title = req.query.title;
  var condition = {$and: [
          {title: {$regex: new RegExp(title), $options: "i"}},
          {currentUser} ]};

      LieBible.find(condition)
  .sort(arr)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving all bible lies."
    });
  });
};

// Update a LieBible with id
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty"
      });
    }
  const id = req.params.id;
  
  LieBible.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Bible Lie with id=${id}. Maybe Bible Lie was not found`
          });
        } else res.send({ message: "Bible Lie was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Bible Lie with id=" + id
        });
      });
};

// Retrieve a LieBible with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LieBible.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Bible Lie not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Bible Lie with id=" + id });
    }); 
};

// Delete a LieBible with id
exports.delete = (req, res) => {
    const id = req.params.id;

    LieBible.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Bible Lie with id=${id}. Maybe Bible Lie was not found`
          });
        } else {
          res.send({
            message: "Bible Lie was deleted successfully"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Bible Lie with id=" + id
        });
      });
};