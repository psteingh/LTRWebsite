const db = require("../models");
const { liesgeneral: LieGeneral, user: User } = db;

// Create and Save a new LieGeneral
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create a LieGeneral
  const liegeneral = new LieGeneral({
    title: req.body.title,
    middle: req.body.middle,
    bottom: req.body.bottom,
    currentUser: req.body.currentUser,
    published: req.body.published ? req.body.published : false
  });
  
  // Save a LieGeneral
  liegeneral.save(liegeneral)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the General Lie"
      });
    });
};

// Retrieve and Sort all LieGenerals
exports.findAll = (req, res) => {
  const arr = { title: 1};
  const currentUser = req.userId;
  const title = req.query.title;
  var condition = {$and: [
          {title: {$regex: new RegExp(title), $options: "i"}},
          {currentUser} ]};

      LieGeneral.find(condition)
  .collation({locale: "en"})
  .sort(arr)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving all general lies."
    });
  });
};

// Update a LieGeneral with id
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty"
      });
    }
  const id = req.params.id;
  
  LieGeneral.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update General Lie with id=${id}. Maybe General Lie was not found`
          });
        } else res.send({ message: "General Lie was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating General Lie with id=" + id
        });
      });
};

// Retrieve a LieGeneral with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LieGeneral.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "General Lie not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving General Lie with id=" + id });
    }); 
};

// Delete a LieGeneral with id
exports.delete = (req, res) => {
    const id = req.params.id;

    LieGeneral.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete General Lie with id=${id}. Maybe General Lie was not found`
          });
        } else {
          res.send({
            message: "General Lie was deleted successfully"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete General Lie with id=" + id
        });
      });
};