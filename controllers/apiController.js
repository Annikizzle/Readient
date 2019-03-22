const db = require("../models");
const Axios = require("axios");
const queryURL = "https://www.googleapis.com/books/v1/volumes?q=";

module.exports = {
  // Add to database if not exists, send array of books to client
  findAll: (req, res) => {
    Axios.get(queryURL + req.body.query).then((result) => {
      const bookList = result.data.items;
      const books = [];
      bookList.forEach(element => {
        if(element.volumeInfo.imageLinks) {
          const book = {
            title: element.volumeInfo.title,
            authors: element.volumeInfo.authors,
            description: element.volumeInfo.description,
            image: element.volumeInfo.imageLinks.thumbnail,
            link: element.volumeInfo.infoLink,
            googleID: element.id
          }
          console.log(book);
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

// title: {
//   type: String,
//   required: true
// },
// authors: {
//   type: [String],
//   required: true
// },
// description: {
//   type: String,
//   required: true
// },
// image: {
//   type: String,
//   required: true
// },
// link: {
//   type: String,
//   required: true
// },
// googleID: {
//   type: String,
//   required: true,
//   unique: true
// }