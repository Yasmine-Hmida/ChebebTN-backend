const express = require("express");
const jobController = require("../controllers/jobController");
const router = express.Router();

// Route to create a new Job
router.post('/jobs', jobController.createJob);

// Route to Select Jobs
router.get('/jobs', jobController.getAllJobs);

// Route to getSpecificJob
router.get('/jobs/:id', jobController.getById);

// Route to delete a job
router.delete('/jobs/:id', jobController.deleteJob);

// Route to Update
router.put('/jobs/:id', jobController.updateJob);

module.exports = router;