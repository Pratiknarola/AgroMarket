const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/user/:username", [authJwt.verifyToken], controller.getprofile);
  app.get(
    "/api/getpastauction",
    [authJwt.verifyToken],
    controller.getpastauctions
  );
  app.get(
    "/api/getpresentauction",
    [authJwt.verifyToken],
    controller.getpresentauctions
  );
  app.get(
    "/api/getfutureauction",
    [authJwt.verifyToken],
    controller.getfutureauctions
  );

  app.get(
    "/api/:auctionid/leaderboard",
    [authJwt.verifyToken],
    controller.getleaderboard
  );

  app.get(
    "/api/test/farmer",
    [authJwt.verifyToken, authJwt.isFarmer],
    controller.farmerBoard
  );

  app.get(
    "/api/test/buyer",
    [authJwt.verifyToken, authJwt.isBuyer],
    controller.buyerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
