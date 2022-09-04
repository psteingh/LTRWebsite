module.exports = app => {
  const liesgeneral = require("../controllers/liegeneral.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a LieGeneral - 1st
  router.post("/", liesgeneral.create);
  
  // Retrieve all LieGenerals
  router.get("/",
    [authJwt.verifyToken],
    liesgeneral.findAll);

  // Update a LieGeneral with id
  router.put("/:id", liesgeneral.update);
    
  // Retrieve a LieGeneral with id
  router.get("/:id", liesgeneral.findOne);
  
  // Delete a LieGeneral with id
  router.delete("/:id", liesgeneral.delete);
  
  app.use("/api/liesgeneral", router);

};