module.exports = app => {
  const liesmedia = require("../controllers/mediaboard.controller");
  const router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published LieMedias
  router.get("/", liesmedia.findAllPublished);
  
  app.use("/api/mediaboard", router);

};