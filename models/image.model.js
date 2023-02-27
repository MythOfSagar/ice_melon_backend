const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
 name:String,
 image:{
    data:Buffer,
    contentType:String
 }
});

const ImageModel = mongoose.model("images", imageSchema);

module.exports = { ImageModel };
