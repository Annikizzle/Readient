const db = require("../models");

module.exports = {

  findAll: (req, res) => {
    if (req.user) {
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
      
      db.SavedBooks.find(savedBook).then((dbSaved) => {
        const [foundBook] = dbSaved;
        if (dbSaved.length < 1) {
          let savedResponse;
          db.SavedBooks.create(savedBook).then((dbSaved) => {
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
          res.status(304);
        }

      });

    }
    else {
      res.status(403);
    }
  },

  delete: (req, res) => {
    if (req.user) {
      let deletedBook;
      db.SavedBooks.findOneAndDelete({ book: req.params.id }).then((dbSaved) => {
        const user = dbSaved.user;
        const id = dbSaved._id;
        let deletedBook = dbSaved;
        db.User.update({ _id: user }, { $pull: { savedBooks: id }}).then((dbUser) => {
          res.json(deletedBook);
        }); 
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