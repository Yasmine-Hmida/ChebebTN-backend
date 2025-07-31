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
            applicationDeadline,
            postedBy: req.user.id // Add the ID of the admin who created the job 
        });

        const savedJob = await newJob.save(); // Enregistrement dans la bd
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
        // .populate: Bring me not just the ID, but the actual object it points to
        const job = await Job.findById(req.params.id).populate("postedBy" , "username email"); // find it in the end of the URI
        if(!job){
            return res.status(404).json({message: "Job not Found!"});
        }
        res.status(200).json(job);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

// Delete a Job
exports.deleteJob = async (req, res) => {
    try{
        const job = await Job.findByIdAndDelete(req.params.id);
        if(!job){
            return res.status(404).json({message: "Job not Found!"});
        }
        res.status(200).json({message: "Job Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

// Update a job
exports.updateJob = async (req, res) => {
    const {title , company , description , salary , location , jobType , 
           status , experienceLevel , skills , applicationDeadline} = req.body; // Vérification des données
    try{
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            {title , company , description , salary , location , jobType , 
            status , experienceLevel , skills , applicationDeadline},
            {new:true}
        );
        if(!job){
            return res.status(404).json({message: "Job not Found!"});
        }
        res.status(200).json(job);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}