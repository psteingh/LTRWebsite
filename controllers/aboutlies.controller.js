const db = require("../models");
const { aboutlies: AboutLies, user: User } = db;

// Create and Save a new AboutLies
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create an AboutLies
  const aboutlies = new AboutLies({
    title: req.body.title,
    middle: req.body.middle,
    bottom: req.body.bottom,
    currentUser: req.body.currentUser,
    published: req.body.published ? req.body.published : false
  });
  
  // Save an AboutLies
  aboutlies.save(aboutlies)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the About Lies"
      });
    });
};

// Retrieve and Sort all AboutLies
exports.findAll = (req, res) => {
  const arr = { title: 1};
  const currentUser = req.userId;
  const title = req.query.title;
  var condition = {$and: [
          {title: {$regex: new RegExp(title), $options: "i"}},
          {currentUser} ]};

      AboutLies.find(condition)
  .collation({locale: "en"})
  .sort(arr)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving all about lies."
    });
  });
};

// Update an AboutLies with id
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty"
      });
    }
  const id = req.params.id;
  
  AboutLies.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update About Lies with id=${id}. Maybe About Lie was not found`
          });
        } else res.send({ message: "About Lies was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating About Lies with id=" + id
        });
      });
};

// Retrieve an AboutLies with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AboutLies.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "About Lies not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving About Lies with id=" + id });
    }); 
};

// Delete an AboutLies with id
exports.delete = (req, res) => {
    const id = req.params.id;

    AboutLies.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete About Lies with id=${id}. Maybe About Lies was not found`
          });
        } else {
          res.send({
            message: "About Lies was deleted successfully"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete About Lies with id=" + id
        });
      });
};