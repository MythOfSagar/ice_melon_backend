require("dotenv").config();

const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true });






module.exports = { connection };

