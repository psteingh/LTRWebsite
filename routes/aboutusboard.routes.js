module.exports = app => {
  const aboutus = require("../controllers/aboutusboard.controller");
  const router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published AboutUs
  router.get("/", aboutus.findAllPublished);
  
  app.use("/api/aboutusboard", router);

};