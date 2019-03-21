const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => bcrypt.hashSync(plainTextPassword, 10)
}

UserSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =========NO PASSWORD PROVIDED=========");
    next();
  }
  else {
    console.log("models/user hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;