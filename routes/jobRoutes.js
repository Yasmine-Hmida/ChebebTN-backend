const express = require("express");
const jobController = require("../controllers/jobController");
const router = express.Router();

// Route to create a new Job
router.post('/jobs', jobController.createJob);

module.exports = router;