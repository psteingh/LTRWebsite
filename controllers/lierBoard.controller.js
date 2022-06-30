const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {
  // const arr = ["Beta", "Alpha"];

  const arr = ["Beta", "Alpha"];

  LtrLie.find({published: true})
  
  .then(data => {
    // console.log(data);

    arr.sort();
    console.log(data);

    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};

// exports.sortAllPublished = (req, res) => {
//   const arr = ["Beta", "Alpha"];

//   arr.sort();
//     console.log(arr);
  
  // .then(data => {
  //   console.log(data);

  //   res.send(data);
  // })
  // .catch(err => {
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred while retrieving ltrlies."
  //     });
  // });