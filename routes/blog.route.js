const { Router } = require("express");
const  auth = require("../middleware/auth.middleware");

const blogRouter = Router();
const { BlogModel } = require("../models/blog.model");

blogRouter.get("/", async (req, res) => {

  const {category}=req.query

  try {
    let allBlogs
    if(category){
      allBlogs = await BlogModel.find({category});
    }else{
      allBlogs = await BlogModel.find();
    }
   
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


blogRouter.use(auth)

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



blogRouter.get("/favourites/:id", async (req, res) => {
  const { id } = req.params;
  try {

    const favouritesBlog = await BlogModel.find({favourites:{[id]:true}});
    res.status(200).send(favouritesBlog);
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await BlogModel.findByIdAndDelete(id);
    res.status(202).send("Succcessfully deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const udatedDetails = req.body;

  try {
    await BlogModel.findByIdAndUpdate(id, { ...udatedDetails });

    res.status(204).send(udatedDetails);
  } catch (err) {
    res.status(500).send(err);
  }
});

blogRouter.patch("/addtofavourite/:blogId", async (req, res) => {
  const { creator } = req.body;
  const { blogId } = req.params;

  console.log(req.body);

  try {
    const singleBlog = await BlogModel.findById(blogId);
    const favourites = singleBlog.favourites;

    await BlogModel.findByIdAndUpdate(blogId, {
      favourites: { ...favourites, [creator]: true },
    });

    res.status(200).send("Added to Favourites");
  } catch (err) {
    res.status(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});

blogRouter.patch("/removefromfavourite/:blogId", async (req, res) => {
  const { creator } = req.body;
  const { blogId } = req.params; 

  console.log('Got in Removing');

  try {
    const singleBlog = await BlogModel.findById(blogId);
    const favourites = singleBlog.favourites;

    await BlogModel.findByIdAndUpdate(blogId, {
      favourites: { ...favourites, [creator]: false },
    });
    res.status(200).send("Removed from Favourites");
  } catch (err) {
    res.status(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});

module.exports = { blogRouter };
