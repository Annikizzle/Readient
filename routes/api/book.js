const Router = require("express").Router();
const bookController = require("../../controllers/bookController");

Router.route("/")
  .get(bookController.findAll)
  .post(bookController.create);

Router.route("/:id")
  .get(bookController.findByID)
  .delete(bookController.delete);

Router.route("/googleID/:id")
  .get(bookController.findByGoogleID);

module.exports = Router;