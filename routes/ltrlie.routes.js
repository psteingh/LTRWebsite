module.exports = app => {
  const ltrlies = require("../controllers/ltrlie.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new LtrLie - 1st
  router.post("/", ltrlies.create);
  
  // Retrieve all LtrLies
  router.get("/",
    [authJwt.verifyToken],
    ltrlies.findAll);

  // Update a LtrLie with id
  router.put("/:id", ltrlies.update);
    
  // Retrieve a LtrLie with id
  router.get("/:id", ltrlies.findOne);
  
  // Delete a LtrLie with id
  router.delete("/:id", ltrlies.delete);
  
  app.use("/api/ltrlies", router);

};