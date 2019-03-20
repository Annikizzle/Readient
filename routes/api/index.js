const path = require("path");
const Router = require("express").Router();
const userRoutes = require("./user");

Router.use("/user", userRoutes);

// For anything else, render the html page
Router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = Router;