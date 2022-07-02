module.exports = app => {
  const liesbible = require("../controllers/liebible.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a LieBible - 1st
  router.post("/", liesbible.create);
  
  // Retrieve all LieBibles
  router.get("/",
    [authJwt.verifyToken],
    liesbible.findAll);

  // Update a LieBible with id
  router.put("/:id", liesbible.update);
    
  // Retrieve a LieBible with id
  router.get("/:id", liesbible.findOne);
  
  // Delete a LieBible with id
  router.delete("/:id", liesbible.delete);
  
  app.use("/api/liesbible", router);

};