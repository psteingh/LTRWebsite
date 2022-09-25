const db = require("../models");
const { aboutus: AboutUs, user: User } = db;

// Create and Save a new AboutUs
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create an AboutUs
  const aboutus = new AboutUs({
    title: req.body.title,
    middle: req.body.middle,
    bottom: req.body.bottom,
    currentUser: req.body.currentUser,
    published: req.body.published ? req.body.published : false
  });
  
  // Save an AboutUs
  aboutus.save(aboutus)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the About Us"
      });
    });
};

// Retrieve and Sort all AboutUs
exports.findAll = (req, res) => {
  const arr = { title: 1};
  const currentUser = req.userId;
  const title = req.query.title;
  var condition = {$and: [
          {title: {$regex: new RegExp(title), $options: "i"}},
          {currentUser} ]};

      AboutUs.find(condition)
  .collation({locale: "en"})
  .sort(arr)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving all about us."
    });
  });
};

// Update an AboutUs with id
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty"
      });
    }
  const id = req.params.id;
  
  AboutUs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update About Us with id=${id}. Maybe About Us was not found`
          });
        } else res.send({ message: "About Us was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating About Us with id=" + id
        });
      });
};

// Retrieve an AboutUs with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AboutUs.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "About Us not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving About Us with id=" + id });
    }); 
};

// Delete an AboutUs with id
exports.delete = (req, res) => {
    const id = req.params.id;

    AboutUs.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete About Us with id=${id}. Maybe About Us was not found`
          });
        } else {
          res.send({
            message: "About Us was deleted successfully"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete About Us with id=" + id
        });
      });
};