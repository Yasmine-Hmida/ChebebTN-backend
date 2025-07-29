const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

// Route to create a new Blog
router.post("/blogs" , blogController.createBlog);

module.exports = router;