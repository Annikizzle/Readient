const Router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../passport");

//router.route("/").get(controller method)
Router.route("/").post(userController.createUser);

// TODO: figure out how to pass these three parameters from the controller
Router.route("/login").post(
  (req, res, next) => {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log('logged in', req.user);
    var userInfo = {
        username: req.user.username
    };
    res.send(userInfo);
  }
);

module.exports = Router;