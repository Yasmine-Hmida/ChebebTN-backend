// Importation Importants
const express = require("express");    // Importer ExpressJS
const cors = require("cors");    // Importer cors
const dotenv = require('dotenv');      
const mongoose = require("mongoose");  // Importer la biblio pour l'interaction avec mongoDB.
const jobRoutes = require("./routes/jobRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");


// Création d'une application Express
const app = express();
dotenv.config(); // Loads .env file contents into process.env by default


// express.json() sert à lire automatiquement les données JSON envoyées par le client dans req.body(comme POST ou PUT)
app.use(cors());  // enable cors for all routes (no conditions)
app.use(express.json()); // On a choisi json car on utilise mongodb(orienté document)


// Connect to mongoDB
mongoose
    .connect(process.env.MONGO_URI, { // MONGO_URI: Variable d'environnement qui a l'URL de la BD.
      useNewUrlParser: true,    // Pour l'analyse (le Parsing) de l'url de MONGO_URI
      useUnifiedTopology: true, // Activer le moteur de gestion de connexion
    })
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));


// Création des routes GET
app.get('/', (req , res) => {    // req = request / res = response
    /*res.json({                 // Envoi d'une réponse JSON à Postman
          message: "API running!"
    })*/

    res.send("API is running!"); // Envoi d'un texte brut plain à postman
});

app.get('/job' , (req , res) => { // app.get(): to load a single route
    res.json([
        {id:1 , title: "Software Engineer" , company: "Tech Corp"},
        {id:2 , title: "Data Scientist" , company: "Data Inc"}
    ])
});

// Activer les routes de job
app.use('/api', jobRoutes); // app.use(): to load many routes.

// Activer les routes de blog
app.use('/api', blogRoutes);

// Activer les routes de user
app.use('/api', userRoutes);


// Partie Port
const PORT = process.env.PORT || 3000; 

// On démarre le serveur Express et on lui dit d’écouter les requêtes sur le port choisi.
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
});
