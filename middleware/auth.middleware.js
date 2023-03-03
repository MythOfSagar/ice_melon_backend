const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req?.headers.authorization;

  if (token) {
    const decoded = jwt.verify(token, process.env.encryption);
    if (decoded) {
      console.log(decoded);
      req.body.creator=decoded.creator
      next();
    } else {
      res.send("LOGIN FIRST");
    }
  } else {
    res.send("LOGIN FIRST");
  }
};

module.exports =  auth ;
