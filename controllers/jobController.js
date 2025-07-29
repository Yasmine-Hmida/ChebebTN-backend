// CRUD for Job.js

// Importer jobSchema
const Job = require("../models/Job")

// Create a new Job
exports.createJob = async (req , res) => {
    const {title , company , description , salary , location , jobType , 
           status , experienceLevel , skills , applicationDeadline} = req.body; // Vérification des données
    try{
        const newJob = new Job({ // Création du Job
            title,
            company,
            description,
            salary,
            location,
            jobType,
            status,
            experienceLevel,
            skills,
            applicationDeadline
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    }
    catch(err){
        res.status(500).json({message: err.message });
    }
}

// Select jobs
exports.getAllJobs = async (req , res) => {
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

// Get a specific Job
exports.getById = async (req , res) => {
    try{
        const job = await Job.findById(req.params.id); // find it in the end of the URI
        if(!job){
            return res.status(404).json({message: "Job not Found!"});
        }
        res.status(200).json(job);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}