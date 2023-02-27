const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const {blogRouter} = require("./routes/blog.route");
const cors=require('cors')

const app = express();

app.use(cors({origin:'*'}))

app.use(express.json());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("ICE MELON");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("SuccessFully Connected");
  } catch (err) {
    console.log("Error while Connecion");
  }
});
