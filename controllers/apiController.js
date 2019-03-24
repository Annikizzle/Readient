const db = require("../models");
const Axios = require("axios");
const queryURL = "https://www.googleapis.com/books/v1/volumes?q=";

module.exports = {
  // Add to database if not exists, send array of books to client
  findAll: (req, res) => {
    console.log(queryURL + req.query.query);
    const URL = queryURL + req.query.query + ":keyes&key=" + process.env.GOOGLE_BOOKS_KEY
    Axios.get(queryURL + req.query.query).then((result) => {
      const bookList = result.data.items;
      const books = [];
      bookList.forEach(element => {
        if(element.volumeInfo.imageLinks && element.volumeInfo.authors) {
          const book = {
            title: element.volumeInfo.title,
            authors: element.volumeInfo.authors,
            description: element.volumeInfo.description,
            image: element.volumeInfo.imageLinks.thumbnail,
            link: element.volumeInfo.infoLink,
            googleID: element.id
          }
          books.push(book);
        }
      });
      res.json(books);
    }).catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
  }
}