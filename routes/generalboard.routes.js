module.exports = app => {
  const liesgeneral = require("../controllers/generalboard.controller");
  const router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all published LieGenerals
  router.get("/", liesgeneral.findAllPublished);
  
  app.use("/api/generalboard", router);

};