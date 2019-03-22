const path = require("path");
const Router = require("express").Router();
const book = require("./book");
const google = require("./google");

Router.use("/books", book);
Router.use("/google", google);

// For anything else, render the html page
Router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = Router;