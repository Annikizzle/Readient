module.exports = {
  User: require("./User"),
  Book: require("./Book"),
  SavedBooks: require("./SavedBooks")
}

// SAVED stored as array in each user - has book id and enum with status (toread, reading, read)
// BOOKS just like in hw