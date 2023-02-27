const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  userName: String,
  myFavourites:Object
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
