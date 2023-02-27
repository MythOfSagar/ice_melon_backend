const { Router } = require("express");

const blogRouter = Router();
const { BlogModel } = require("../models/blog.model");

blogRouter.post("/", async (req, res) => {
  const newBlogDetails = req.body;

  try {
    const newBlog = new BlogModel({ ...newBlogDetails });
    await newBlog.save();
    res.status(201).send("Successfully Created Blog");
  } catch (err) {
    res.send(err);
  }
});

blogRouter.get("/", async (req, res) => {

  try {
    const allBlogs = await BlogModel.find();

    res.status(200).send(allBlogs);
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleBlog = await BlogModel.findById(id);

    res.status(200).send(singleBlog);
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.get("/favourites/:id", async (req, res) => {
  const { id } = req.params;
  try {

    const favouritesBlog = await BlogModel.find({favourites:{[id]:true}});


    res.status(200).send(favouritesBlog);
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await BlogModel.findByIdAndDelete(id);
    res.status(202).send("Succcessfully deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const udatedDetails = req.body;

  try {
    await BlogModel.findByIdAndUpdate(id, { ...udatedDetails });

    res.status(204).send(udatedDetails);
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.put("/addtofavourite/:blogId", async (req, res) => {
  const { userId } = req.body;
  const { blogId } = req.params;

  console.log(blogId, userId);

  try {
    const singleBlog = await BlogModel.findById(blogId);
    const favourites = singleBlog.favourites;

    await BlogModel.findByIdAndUpdate(blogId, {
      favourites: { ...favourites, [userId]: true },
    });

    res.sendStatus(200).send("Added to Favourites");
  } catch (err) {
    res.sendStatus(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});

module.exports = { blogRouter };
