const authJwt = require("../middleware/authJwt");
const controller = require("../controller/farmer.controller");

module.exports = function (app) {

    //app.get("/api/auth/confirm/:confirmationCode", controller.verifyUser);

    app.post(
        "/api/farmer/createauction",
        [authJwt.verifyToken, authJwt.isFarmer],
        controller.createauction
    );
};
