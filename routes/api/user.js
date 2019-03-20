const Router = require("express").Router();
const userController = require("../../controllers/userController");

//router.route("/").get(controller method)
Router.route("/").post((req, res) => res.send("cool"));

module.exports = Router;