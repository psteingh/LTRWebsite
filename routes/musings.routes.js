module.exports = app => {
  const musings = require("../controllers/musings.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a Musings - 1st
  router.post("/", musings.create);
  
  // Retrieve all Musings
  router.get("/",
    [authJwt.verifyToken],
    musings.findAll);

  // Update a Musings with id
  router.put("/:id", musings.update);
    
  // Retrieve a Musings with id
  router.get("/:id", musings.findOne);
  
  // Delete a Musings with id
  router.delete("/:id", musings.delete);
  
  app.use("/api/musings", router);

};