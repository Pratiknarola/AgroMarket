const { verifySignup } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    // console.log("i m inside auth.rout.js");
    // console.log(req.body);
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.get("/api/auth/confirm/:confirmationCode", controller.verifyUser);
  app.get("/confirm/:confirmationCode", controller.verifyUser);

  app.post(
    "/api/auth/signup",
    [
      verifySignup.checkDuplicateUsernameOrEmail,
      verifySignup.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
