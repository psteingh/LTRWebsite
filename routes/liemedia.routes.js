module.exports = app => {
  const liesmedia = require("../controllers/liemedia.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a LieMedia - 1st
  router.post("/", liesmedia.create);
  
  // Retrieve all LieMedias
  router.get("/",
    [authJwt.verifyToken],
    liesmedia.findAll);

  // Update a LieMedia with id
  router.put("/:id", liesmedia.update);
    
  // Retrieve a LieMedia with id
  router.get("/:id", liesmedia.findOne);
  
  // Delete a LieMedia with id
  router.delete("/:id", liesmedia.delete);
  
  app.use("/api/liesmedia", router);

};