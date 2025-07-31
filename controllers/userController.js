const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { isValidEmail } = require("../middleware/UserValidation");
require('dotenv').config(); // To get JWT_SECRET (Secret key)

// @desc  Register a new user
// @route POST /api/register

// Sign Up Functionality
exports.registerUser = async (req , res) => {
    try{
        const {username , email , password , repeatPassword , role} = req.body;
        const existingUser = await User.findOne({email});
        
        // Vérification
        if(existingUser){
            return res.status(400).json({msg: "You have already registered!"});
        }
        if(!isValidEmail(email)){
            return res.status(400).json({msg: "Invalid Email Format!"});
        }
        if(password.length < 8 || !/[A-Z]/.test(password)){
            return res.status(400)
              .json({
                msg: "Password at least 8 characters long, and contain at least one capital letter"
              });
        }

        // Check if passwords match
        if(password !== repeatPassword){
            return res.status(400).json({
                status: "Error",
                message: "Passwords do not match!"
            });
        }

        // Hash Password before saving it and create the User
        const hashedPassword = await bcrypt.hash(password , 10); // 10: how many times you're gonna hash it before returning it

        // We store the user in the Database
        let user = await User.create({username , email , password: hashedPassword, role: role || "JobSeeker"}); 

        return res.status(201).json({
            status: "Success",
            data: {user}
        });
    }
    catch(err){
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Login Functionality
exports.loginUser = async (req , res) => {
    const {email , password} = req.body; // Get the data from the login form

    // Check if the user exists in the Database
    const user = await User.findOne({email: email});

    if(!user){
        return res.status(404).json({
            status: 'Error',
            message: "User not found!"
        })
    }

    // Compare Passwords - bcrypt
    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
        return res.status(400).json({
            status: "Error",
            message: "Email or password do not match!"
        })
    }

    // Create a token and send it to the client
    const token = jwt.sign({id: user._id, role:user.role} , process.env.JWT_SECRET , {expiresIn: '24h'});

    res.json({
        status:"Success", 
        result: {
            token,
            userId: user._id,
            role:user.role
        },
        message: "Logged in successfully!"
    });
};