  exports.allAccess = (req, res) => {
    res.status(200).send("This is what everyone sees");
  };
  
  exports.user = (req, res) => {
    res.status(200).send("Only you see this");
  };

  exports.admin = (req, res) => {
    res.status(200).send("Admin");
  };