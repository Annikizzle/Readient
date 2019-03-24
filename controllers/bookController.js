const db = require("../models");

module.exports = {

  findAll: (req, res) => {
    db.Book.find({}).then((dbBook) => {
      console.log(dbBook);
      res.json(dbBook);
    }).catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
  },

  findByID: (req, res) => {
    db.Book.findById(req.params.id).then((dbBook) => {
      console.log(dbBook);
      res.json(dbBook);
    }).catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
  },

  findByGoogleID: (req, res) => {
    db.Book.find({ googleID: req.params.id }).then((dbBook) => {
      console.log(dbBook);
      res.json(dbBook);
    }).catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
  },

  create: (req, res) => {
    db.Book.create(req.body).then((dbBook) => {
      res.json(dbBook);
    }).catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
  },
  
  delete: (req, res) => {
    db.Book.findOneAndRemove({ _id: req.params.id }).then((dbBook) => {
      console.log(dbBook);
      res.json(dbBook);
    }).catch((err) => {
      console.log(err);
      res.status(422).json(err);
    })
  },
}