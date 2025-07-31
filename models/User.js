const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role:{
            type:String,
            enum: ["Admin", "JobSeeker"],
            default: "JobSeeker"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User" , userSchema);