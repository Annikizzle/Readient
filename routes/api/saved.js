const Router = require("express").Router();
const savedController = require("../../controllers/savedController");

Router.route("/")
  .get(savedController.findAll)
  .post(savedController.create);

Router.route("/:id")
  // .get(bookController.findByID)
  // .delete(bookController.delete);

module.exports = Router;