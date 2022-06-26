const db = require("../models");
const LtrLie = db.ltrlies;

// Retrieve all published LtrLies
exports.findAllPublished = (req, res) => {

  LtrLie.find({published: true})
  .then(data => {
    // console.log(data);

    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  });
};

exports.sortAllPublished = (req, res) => {
  const match = {}
  const sort = {}

  if(req.query.published){
    match.published = req.query.published === 'true'
}

  if(req.query.sortBy && req.query.OrderBy){
    sort[req.query.sortBy]   = req.query.OrderBy === 'desc' ? -1 : 1
  }

  LtrLie()
  try {
    req.user.populate({
        // path:'posts',
        match,
        options:{
            // limit: parseInt(req.query.limit),
            // skip: parseInt(req.query.skip),
            sort
        }
    }).execPopulate()
    res.send(data)
    console.log(data);
  }
  catch(error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ltrlies."
      });
  };
};



// Sort all published LtrLies
// exports.sortAllPublished = (req, res) => {
  
//   LtrLie.find()
//   .then(data => {
//     console.log(data);

//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving ltrlies."
//       });
//   });
// };