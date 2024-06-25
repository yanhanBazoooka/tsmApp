var express = require('express');
var router = express.Router();
const teamController = require('../controllers/team.controller');

// Create a new team
router.post('/create', teamController.create);

// Retrieve teams by user ID (assuming user ID is provided as a parameter)
router.get('/user/:userId', teamController.findTeamsByUserId);

module.exports = router;
