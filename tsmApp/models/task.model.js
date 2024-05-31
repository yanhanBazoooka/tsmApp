// DB schema
module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerId: { //foreign key to user table user_id
        type: Sequelize.INTEGER,
        references: {model: "users", key: 'id'},
        allowNull: false
      },
      assignee: {//foreign key to user table user_id
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Task;
  };
 