const { Router } = require("express");

const blogRouter = Router();
const { BlogModel} = require("../models/blog.model");


blogRouter.post("/", async (req, res) => {
  const newBlogDetails= req.body;

  try {
    const newBlog = new BlogModel({...newBlogDetails});
    await newBlog.save();
    res.status(201).send('Successfully Created Blog');
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

     const {id} =req.params
     
    try {
      const singleBlog = await BlogModel.findById(id);
  
      res.status(200).send(singleBlog);
    } catch (err) {
      res.status(500).send(err);
    }
  
  });


  blogRouter.delete("/:id", async (req, res) => {
    const {id} =req.params
    console.log(id)

   try {
      await BlogModel.findByIdAndDelete(id);
     res.status(202).send('Succcessfully deleted');
   } catch (err) {
     res.status(500).send(err);
   }
 
 });

 blogRouter.patch("/:id", async (req, res) => {
    const {id} =req.params
    const udatedDetails = req.body;

   try {
      await BlogModel.findByIdAndUpdate(id,{...udatedDetails});
      
     res.status(204).send(udatedDetails);

   } catch (err) {
     res.status(500).send(err);
   }
 
 });



module.exports = { blogRouter };