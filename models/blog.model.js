const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  date: Date,
  content: String,
  userName:String,
  category: String,
  image:String
});

const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = { BlogModel };
