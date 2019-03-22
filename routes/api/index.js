const path = require("path");
const Router = require("express").Router();
const bookRoutes = require("./book");

Router.use("/books", bookRoutes);

// For anything else, render the html page
Router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = Router;