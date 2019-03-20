const path = require("path");
const Router = require("express").Router();
const API = require("./api");

Router.use("/api", API);

// If no API routes are hit, send the React app
Router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = Router;