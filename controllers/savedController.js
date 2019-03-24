const db = require("../models");

module.exports = {

  findAll: (req, res) => {
    console.log(db.SavedBooks);
    res.json("hi");
  },

  create: (req, res) => {
    // console.log(db.SavedBooks);
    if (req.user) {
      // console.log(req.body.googleID);
      // console.log(req.user._id);
      const savedBook = {
        googleID: req.body.googleID,
        user: req.user._id
      }
      let savedResponse;
      db.SavedBooks.create(savedBook).then((dbSaved) => {
        console.log(dbSaved)
        savedResponse = dbSaved;
        return db.User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { savedBooks: dbSaved._id }},
          { new: true },
        );
      }).then(() => {
        res.json(savedResponse);
      }).catch((err) => {
        res.status(422).json(err);
      });
    }
    else {
      res.status(403);
    }
  }
}