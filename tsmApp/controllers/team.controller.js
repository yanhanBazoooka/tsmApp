const db = require("../models");
const Team = db.teams;
const Op = db.Sequelize.Op;

// Create and Save a new Team
exports.create = (req, res) => {
    // Validation on request
    console.log(req);
    if (!req.body.name || !req.body.description) {
        res.status(400).send({
            message: "All fields must be filled!"
        });
        return;
    }

    // Create team object
    const team = {
        name: req.body.name,
        description: req.body.description
    };

    // Save team in the database
    Team.create(team)
        .then(data => { // On success
            console.log(data);
            res.redirect('/home');
        })
        .catch(err => { // On error
            res.status(500).send({ // Internal server error
                message: err.message || "Some error occurred while creating the Team."
            });
        });
};

// Retrieve all Teams for a specific user from the database
exports.findTeamsByUserId = (req, res) => {
    console.log(req);
    // Validate input
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).send({
            message: "User ID cannot be empty!"
        });
        return;
    }

    // Query with condition
    var condition = { owner: userId };
    Team.findAll({ where: condition })
        .then(data => {
            if (data.length == 0) {
                res.status(404).send({
                    message: "No teams found for this user."
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Teams."
            });
        });
};

// Find a single Team with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Team.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Team with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Team with id=" + id
            });
        });
};

// Delete a Team with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Team.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Team was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Team with id=${id}. Maybe Team was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Team with id=" + id
            });
        });
};

// Delete all Teams from the database
exports.deleteAll = (req, res) => {
    Team.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Teams were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all teams."
            });
        });
};

// Find all Teams by name
exports.findAllByName = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Team.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving teams."
            });
        });
};
