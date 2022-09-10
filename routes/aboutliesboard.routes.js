module.exports = app => {
  const aboutlies = require("../controllers/aboutliesboard.controller");
  const router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published AboutLies
  router.get("/", aboutlies.findAllPublished);
  
  app.use("/api/aboutliesboard", router);

};