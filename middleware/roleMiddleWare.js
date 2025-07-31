const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorizeRole = (role) => {
    return (req , res , next) => { // next is a callback function
        const token = req.headers["authorization"]?.split(" ")[1]; // form: bearer token
        if(!token) return res.status(401).json({message: "No token provided!"});

        try{
            // Take the token and check if it's real and not fake using our secret key
            const decoded = jwt.verify(token , process.env.JWT_SECRET); // decoder et verifer
            
            if(decoded.role !== role){
                return res.status(403).json({message: "Insufficient permission"});
            }

            // Attach the user info to the request (req) so we can use it later in the route
            req.user = decoded;
            next();
        }
        catch(err){
            return res.status(500).json({message: "Invalid token"});
        }
    }
}

module.exports = {authorizeRole};