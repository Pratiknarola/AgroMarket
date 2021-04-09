exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };

  exports.farmerBoard = (req, res) => {
    res.status(200).send("Farmer Content.");
  };
  
  exports.buyerBoard = (req, res) => {
    res.status(200).send("Buyer Content.");
  };