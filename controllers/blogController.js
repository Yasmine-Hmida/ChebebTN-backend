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