const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validation on request
    console.log(req);
    if (!req.body.description || !req.body.priority || !req.body.owner || !req.body.assignee) {
        res.status(400).send({
            message: "All fields must be filled!"
        });
        return;
    }

    // Create task object
    const task = {
        description: req.body.description,
        priority: req.body.priority,
        owner: req.body.owner,
        assignee: req.body.assignee
    };

    // Save task in the database
    Task.create(task)
        .then(data => { // On success
            console.log(data);
            res.redirect('/home');
        })
        .catch(err => { // On error
            res.status(500).send({ // Internal server error
                message: err.message || "Some error occurred while creating the Task."
            });
        });
};

// Retrieve all Tasks for a specific user from the database
exports.findTasksByUserId = (req, res) => {
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
    Task.findAll({ where: condition })
        .then(data => {
            if (data.length == 0) {
                res.status(404).send({
                    message: "No tasks found for this user."
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Tasks."
            });
        });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Task with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            });
        });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Delete all Tasks from the database
exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tasks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tasks."
            });
        });
};

// Find all Tasks by name
exports.findAllByName = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Task.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks."
            });
        });
};
