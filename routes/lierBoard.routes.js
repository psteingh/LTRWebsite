module.exports = app => {
  const lierboard = require("../controllers/lierboard.controller.js");
  // const ltrlies = require("../controllers/lierBoard.controller.js");
  const router = require("express").Router();
  const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published LtrLies
  router.get("/", lierboard.findAllPublished);

  console.log("lierboard.routes.js");
  
  app.use("/api/lierboard", router);

};