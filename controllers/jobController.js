// CRUD for Job.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

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
        const job = await Job.findById(req.params.id).populate("postedBy" , "username email"); // req.params.id: find it in the end of the URI
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
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({message: "Job not Found!"});
        }

        if(job.postedBy.toString() !== req.user.id){
            return res.status(401).json({message: "Unauthorized Delete!"});
        }

        await Job.findByIdAndDelete(req.params.id);
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
        const job = await Job.findById(req.params.id).select("postedBy"); // Get the Id of who posted this job
        if(!job){
            return res.status(404).json({message: "Job not Found!"});
        }

        // Check if who posted the job is the one that wants to update the job
        if(req.user.id !== job.postedBy.toString()){
            return res.status(401).json({
                status: 'Error',
                message: "Unauthorizd Update"
            })
        }

        // Else, we now update
        const jobToUpdate = await Job.findByIdAndUpdate(
            req.params.id,
            {
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
            },
            {new: true}
        );
        res.status(200).json(jobToUpdate);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

// Apply for job
exports.applyForJob = async (req, res) => {
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({message: "Job not found!"});
        }

        if (job.status === "Closed"){
            return res.status(400).json({message: "Sorry, Job applications are closed!"});
        }

        if(!job.applications) job.applications = [];

        job.applications.push({ userId: req.user.id , appliedAt: new Date() });
        await job.save();

        res.status(200).json({message: "Application submitted successfully!"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}