module.exports = app => {
  const aboutlies = require("../controllers/aboutlies.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create an AboutLies - 1st
  router.post("/", aboutlies.create);
  
  // Retrieve all AboutLies
  router.get("/",
    [authJwt.verifyToken],
    aboutlies.findAll);

  // Update an AboutLies with id
  router.put("/:id", aboutlies.update);
    
  // Retrieve an AboutLies with id
  router.get("/:id", aboutlies.findOne);
  
  // Delete an AboutLies with id
  router.delete("/:id", aboutlies.delete);
  
  app.use("/api/aboutlies", router);

};