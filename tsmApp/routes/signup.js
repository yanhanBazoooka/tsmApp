var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");
router.post('/', users.create); //require signup

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

module.exports = router;
