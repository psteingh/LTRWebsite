module.exports = app => {
  const liesbible = require("../controllers/bibleboard.controller");
  const router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published LieBibles
  router.get("/", liesbible.findAllPublished);
  
  app.use("/api/bibleboard", router);

};