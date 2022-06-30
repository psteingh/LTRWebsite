module.exports = app => {
  const ltrlies = require("../controllers/lierboard.controller.js");
  const router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published LtrLies
  router.get("/", ltrlies.findAllPublished);
  
  // Sort all published LtrLies
  // router.get("/", ltrlies.sortAllPublished);

  app.use("/api/lierboard", router);

};