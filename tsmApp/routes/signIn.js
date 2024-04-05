var express = require('express');
var router = express.Router();

/* GET sign-in page. */
router.post('/signIn', function(req, res, next) {
    //TODO: add validation for email and password
    validateResult = true;
    if (validateResult == true) {
        //go to dashboard page
        res.render('dashBoard', { title: 'Welcome to your dashboard' });
    }
    else {    // incorrect credentials
        //stay in the home page/same page
        res.render('index', { title: 'index' });
    }
});

module.exports = router;
