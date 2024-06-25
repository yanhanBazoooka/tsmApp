var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task.controller');

// Create a new task
router.post('/create', taskController.create);

// Retrieve tasks by user ID (assuming user ID is provided as a parameter)
router.get('/user/:userId', taskController.findTasksByUserId);

module.exports = router;
