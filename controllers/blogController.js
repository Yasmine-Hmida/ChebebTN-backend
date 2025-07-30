const Blog = require("../models/Blog");

exports.createBlog = async (req , res) => {
    const {title , description} = req.body;

    try{
        const newBlog = new Blog({
            title,
            description
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.getAllBlogs = async (req , res) => {
    try{
        const blogs = await Blog.find();
        if(!blogs){
            return res.status(404).json({message: "Blogs not found!"});
        }
        res.status(200).json(blogs);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getBlogById = async (req , res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message: "Blog not found!"});
        }
        res.status(200).json(blog);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.deleteBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if(!blog){
            return res.status(404).json({message: "Blog not found!"});
        }
        res.status(200).json({message: "Blog deleted successfully!"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.updateBlog = async (req, res) => {
    const {title, description} = req.body;
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title , description},
            {new: true}
        );

        if(!updatedBlog){
            return res.status(404).json({message: "Blog not found!"});
        }
        res.status(200).json(updatedBlog);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}