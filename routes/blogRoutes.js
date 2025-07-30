const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

// Route to create a new Blog
router.post("/blogs" , blogController.createBlog);

router.get("/blogs", blogController.getAllBlogs);

router.get("/blogs/:id" , blogController.getBlogById);

router.delete("/blogs/:id" , blogController.deleteBlog);

router.put("/blogs/:id" , blogController.updateBlog);

module.exports = router;