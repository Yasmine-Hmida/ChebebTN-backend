// Importation
const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(  // = table in SQL
    {    
        title:{
            type:String, 
            required:true
        },
        company:{
            type:String, 
            required:true
        },
        description:{
            type:String
        },
        salary:{
            type:Number,
            min:0,
        },
        location:{
            type:String,
            required:true
        },
        jobType:{
            type:String,
            enum: ["Full-time" , "Part-time" , "Contract", "Internship"],
            default: "Full-time"
        },
        status:{
            type:String,
            enum:["Open", "Closed"],
            default:"open"
        },
        experienceLevel:{
            type:String,
            enum: ["Entry" , "Mid" , "Senior"],
            default: "Entry"
        },
        skills:{
            type:[String]
        },
        applicationDeadline:{
            type:Date,
            required:true
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, 
    {timestamps: true} // Pour enregistrer la date de création et de modification
); 


// Création d'un modèle Mongoose appelé 'Job' à partir du jobSchema, 
// et l’exporter pour qu’on puisse l’utiliser dans d’autres fichiers.
module.exports = mongoose.model('Job', jobSchema);
