const db = require("../models");

module.exports = {

  findAll: (req, res) => {
    if (req.user) {
      console.log(db.SavedBooks);
      // res.json("hi");
      db.SavedBooks.find({ user: req.user._id }).populate("book").then((dbSaved) => {
        res.json(dbSaved);
      }).catch((err) => {
        res.status(422).json(err);
      });

    }
  },
  
  create: (req, res) => {
    if (req.user) {
      const savedBook = {
        book: req.body._id,
        user: req.user._id
      }
      // console.log(savedBook);
      
      // db.SavedBooks.find(savedBook).then((dbSaved) => {
      //   console.log(dbSaved);
      // });

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
  },

  delete: (req, res) => {
    if (req.user) {
      db.SavedBooks.findOneAndDelete({ book: req.params.id }).then((dbSaved) => {
        console.log(dbSaved);
        res.json(dbSaved);
      }).catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
    }
    else {
      res.status(403);
    }
  }
}