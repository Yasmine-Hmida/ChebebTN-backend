const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { isValidEmail } = require("../middleware/UserValidation");
require('dotenv').config();

// @desc  Register a new user
// @route POST /api/register

// Sign Up Functionality
exports.registerUser = async (req , res) => {
    try{
        const {username , email , password , repeatPassword} = req.body;
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
        const hashedPassword = await bcrypt.hash(password , 10);
        let user = await User.create({username , email , password: hashedPassword}); // We store it in the Database

        return res.status(201).json({
            status: "Success",
            data: {user}
        });
    }
    catch(err){
        console.log(err.message);

        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
