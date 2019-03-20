const Router = require("express").Router();
const userController = require("../../controllers/userController");

//router.route("/").get(controller method)
Router.route("/").post((req, res) => res.send("cool"));
Router.route("/login").post((req, res) => res.json(req.body));

module.exports = Router;