const express = require("express");
const jobController = require("../controllers/jobController");
const {authorizeRole} = require("../middleware/roleMiddleWare");
const router = express.Router();

// Route to create a new Job
router.post('/jobs', authorizeRole("Admin") ,jobController.createJob);

// Route to Select Jobs
router.get('/jobs', jobController.getAllJobs);

// Route to getSpecificJob
router.get('/jobs/:id', jobController.getById);

// Route to delete a job
router.delete('/jobs/:id', authorizeRole("Admin") ,jobController.deleteJob);

// Route to Update a job
router.put('/jobs/:id',authorizeRole("Admin"),jobController.updateJob); 

// Route to apply to a job
router.post("/jobs/:id/apply" , authorizeRole("JobSeeker") ,jobController.applyForJob);

module.exports = router;