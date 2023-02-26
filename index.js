const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const {blogRouter} = require("./routes/blog.route");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("ice_melon_Home");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("SuccessFully Connected");
  } catch (err) {
    console.log("Error while Connecion");
  }
});
