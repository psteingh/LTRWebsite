module.exports = app => {
  const musings = require("../controllers/musingsboard.controller");
  const router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published Musings
  router.get("/", musings.findAllPublished);
  
  app.use("/api/musingsboard", router);

};