const path = require("path");
const Router = require("express").Router();
const book = require("./book");
const google = require("./google");
const saved = require("./saved");

Router.use("/books", book);
Router.use("/google", google);
Router.use("/saved", saved);

// For anything else, render the html page
Router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = Router;