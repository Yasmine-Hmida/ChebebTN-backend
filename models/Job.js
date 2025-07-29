// Importation
const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({    // = table in SQL (équivalent)
    title: {type:String , required:true},
    speciality: {type:String , required: true},
    company: {type:String, required:true}
}, {timestamps: true}); // Pour enregistrer la date de création et de modification.

// Création d'un modèle Mongoose appelé 'Job' à partir du jobSchema, 
// et l’exporter pour qu’on puisse l’utiliser dans d’autres fichiers.
module.exports = mongoose.model('Job', jobSchema);
