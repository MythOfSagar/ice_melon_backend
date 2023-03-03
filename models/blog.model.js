const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  date: Date,
  content: String,
  creator: String,
  category: String,
  favourites: Object,
});

const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = { BlogModel };
