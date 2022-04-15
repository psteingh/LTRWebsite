module.exports = app => {
  const ltrlies = require("../controllers/lierboard.controller.js");
  const router = require("express").Router();
  // const { authJwt } = require("../middleware");
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published LtrLies
  router.get("/published", ltrlies.findAllPublished);

  console.log("lierboard.routes.js");
  
  app.use("/api/ltrlies", router);

};