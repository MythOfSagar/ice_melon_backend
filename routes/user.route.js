const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRouter = Router();

userRouter.post("/signIn", async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const userByEmail = await UserModel.findOne({ email });
    const userByUserName = await UserModel.findOne({ userName });

    if (userByEmail) {
      res.status(409).send({
        error: "Email already exists. Please choose a different Email.",
      });
    } else if (userByUserName) {
      res.status(410).send({
        error: "Username already exists. Please choose a different Username.",
      });
    } else {
      bcrypt.hash(password, +process.env.SaltRounds, async (err, hash) => {
        if (err) {
          res.status(500).send({
            error: "Error Occurred, Please try again",
          });
        } else {
          const newUser = new UserModel({ userName, email, password: hash });
          await newUser.save();
          res.status(201).send("Account created successfully");
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});


userRouter.post("/logIn", async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const findUser = await UserModel.findOne({
      $or: [{ userName }, { email }],
    });
    if (findUser) {
      bcrypt.compare(password, findUser.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { creator: findUser._id },
            process.env.encryption
          );
         
          res.status(200).send({"token":token,"userId":findUser._id});
        } else {
          res.status(401).send({
            error: "Wrong password.",
          });
        }
      });
    } else {
      res.status(402).send({
        error: "Email/UserName not Found.",
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});

module.exports = { userRouter };
