const authJwt = require("../middleware/authJwt");
const controller = require("../controller/buyer.controller");

module.exports = function (app) {
  app.post(
    "/api/buyer/bid",
    [authJwt.verifyToken, authJwt.isBuyer],
    controller.addbid
  );
};
