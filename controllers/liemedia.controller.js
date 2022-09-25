const db = require("../models");
const { liesmedia: LieMedia, user: User } = db;

// Create and Save a new LieMedia
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create a LieMedia
  const liemedia = new LieMedia({
    title: req.body.title,
    middle: req.body.middle,
    bottom: req.body.bottom,
    currentUser: req.body.currentUser,
    published: req.body.published ? req.body.published : false
  });
  
  // Save a LieMedia
  liemedia.save(liemedia)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Media Lie"
      });
    });
};

// Retrieve and Sort all LieMedias
exports.findAll = (req, res) => {
  const arr = { title: 1};
  const currentUser = req.userId;
  const title = req.query.title;
  var condition = {$and: [
          {title: {$regex: new RegExp(title), $options: "i"}},
          {currentUser} ]};

      LieMedia.find(condition)
  .collation({locale: "en"})
  .sort(arr)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving all media lies."
    });
  });
};

// Update a LieMedia with id
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty"
      });
    }
  const id = req.params.id;
  
  LieMedia.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Media Lie with id=${id}. Maybe Media Lie was not found`
          });
        } else res.send({ message: "Media Lie was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Media Lie with id=" + id
        });
      });
};

// Retrieve a LieMedia with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LieMedia.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Media Lie not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Media Lie with id=" + id });
    }); 
};

// Delete a LieMedia with id
exports.delete = (req, res) => {
    const id = req.params.id;

    LieMedia.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Media Lie with id=${id}. Maybe Media Lie was not found`
          });
        } else {
          res.send({
            message: "Media Lie was deleted successfully"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Media Lie with id=" + id
        });
      });
};