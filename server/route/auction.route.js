const { verifySignup } = require("../middleware");
const controller = require("../controller/auction.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        console.log("i m inside admin.rout.js auction");
        console.log(req.body);
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/auction/:tempId", controller.getauction);


};