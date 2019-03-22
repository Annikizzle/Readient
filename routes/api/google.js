const Router = require("express").Router();
const apiController = require("../../controllers/apiController");

Router.route("/")
  .get(apiController.findAll);

module.exports = Router;