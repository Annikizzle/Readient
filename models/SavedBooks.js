const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedBooksSchema = new Schema({
  googleID: {
    type: string,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "UserID"
  },
  status: {
    type: String,
    enum: ["unread", "reading", "read"],
    default: "unread"
  }
});

const SavedBooks = mongoose.model("SavedBooks", SavedBooksSchema);

module.exports= SavedBooks;