const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


// Create and Save a new User
exports.create = (req, res) => {
    //validation on request
    console.log(req);
    if (!req.body.email) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }
    if (req.body.confirmPassword != req.body.password) {
        res.status(400).send({
            message: "Second password has to be the same as the first!"
        });
        return;
    }
    //create user object
    const user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    };
     
    //save user in the db
    User.create(user)
    .then(data => { // on success
        console.log(data);
        // sess = req.session
        // sess.userid = data.id
        // console.log(sess.userid)
        res.redirect('/home');
        // res.send(data);
   })
   .catch(err => { // on error
        res.status(500).send({ // internal server error
            message:
            err.message || "Some error occurred while creating the User."
     });
   });
};

// Retrieve all Users from the database.
exports.findUserByEmail = (req, res) => {
    console.log(req);
    // validate input
    const email = req.body.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    if (!condition) {
        res.status(400).send({
            message: "Email or Password cannot be empty!"
        });
        return;
    }
    // query with condition
    User.findAll({ where: condition })
    .then(data => {
        if (data.length == 0) {
            res.status(400);
            res.render('signin', { message : "Please sign up for the email"});
        } else {
            if (data[0].dataValues.password == req.body.password) {
                // sess = req.session
                // sess.userid = data[0].id
                res.redirect('/home');
            } else {
                res.status(500).send({
                    message:
                        "Incorrect password, please retry!"
                });
            }
     }
   })
   .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Users."
        });
   });
};


// Find a single User with an id
exports.findOne = (req, res) => {
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
}


// Delete all Users from the database.
exports.deleteAll = (req, res) => {
}


// Find all name Users
exports.findAllName = (req, res) => {
}
