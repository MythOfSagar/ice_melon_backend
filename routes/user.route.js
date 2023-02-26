const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRouter = Router();

userRouter.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    bcrypt.hash(password, +(process.env.SaltRounds), async (err, hash) => {
      if (err) {
        res.send("Error Occurred, Please try again Later");
      } else {
        const newUser = new UserModel({ email, password: hash });
        await newUser.save();
        res.send("Account created successfully");
      }
    });
  } catch (err) {
    res.send("Error Occurred, Please try again");
  }
});






userRouter.post("/logIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      bcrypt.compare(password, findUser.password, function (err, result) {
        if (result) {
          const token = jwt.sign({ key: email }, process.env.encryption);
          res.send(token);
        } else {
          res.send("Wrong Password");
        }
      });
    } else {
      res.send("Email not Found");
    }
  } catch (err) {
    res.send("Error Occurred, Please try again");
  }
});

module.exports = { userRouter };
