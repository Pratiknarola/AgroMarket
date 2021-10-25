const authJwt = require("../middleware/authJwt");
const controller = require("../controller/admin.controller");

module.exports = function (app) {
    
  app.use(function (req, res, next) {
    console.log("i m inside admin.rout.js");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.get("/api/auth/confirm/:confirmationCode", controller.verifyUser);

  app.post(
    "/api/admin/addcrop",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addcrop
  );
};
