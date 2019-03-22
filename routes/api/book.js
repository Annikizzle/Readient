const Router = require("express").Router();
const bookController = require("../../controllers/bookController");

Router.route("/")
  .get(bookController.findAll)
  .post(bookController.create);

Router.route("/:id")
  .get(bookController.findByID)
  .delete(bookController.delete);

module.exports = Router;