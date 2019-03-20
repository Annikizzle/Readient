const db = require("../models");
const passport = require("../passport");

module.exports = {
  createUser: (req, res) => {
    const { email, username, password } = req.body;
    db.User.findOne({username: username, email: email}, (err, user) => {
      if (err) {
        console.log("User.js POST ERROR: ", err);
      }
      else if (user) {
        res.json({
          error: "A user already exists with that username/email"
        });
      }
      else {
        const newUser = new db.User({
          email: email,
          username: username,
          password: password
        });
        newUser.save((err, savedUser) => {
          if (err) return res.json(err);
          res.json(savedUser);
        });
      }
    });
  },
  attemptLogin: (req, res, next) => {
    console.log("Login user:");
    console.log(req.body);
    next();
  },
  authLogin: () => passport.authenticate("local"),
  completeLogin: (req, res) => {
    console.log("Logged in", req.user);
    res.send(req.user.username);
  }
}
