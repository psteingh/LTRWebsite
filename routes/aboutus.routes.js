module.exports = app => {
  const aboutus = require("../controllers/aboutus.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create an AboutUs - 1st
  router.post("/", aboutus.create);
  
  // Retrieve all AboutUs
  router.get("/",
    [authJwt.verifyToken],
    aboutus.findAll);

  // Update an AboutUs with id
  router.put("/:id", aboutus.update);
    
  // Retrieve an AboutUs with id
  router.get("/:id", aboutus.findOne);
  
  // Delete an AboutUs with id
  router.delete("/:id", aboutus.delete);
  
  app.use("/api/aboutus", router);

};