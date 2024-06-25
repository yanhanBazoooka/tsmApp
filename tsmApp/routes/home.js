var express = require('express');
var router = express.Router();
const db = require("../models");
const Team = db.teams;
const Task = db.tasks;

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const teams = await Team.findAll();
    const tasks = await Task.findAll();
    res.render('home', { title: 'Home', teams: teams, tasks: tasks });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
