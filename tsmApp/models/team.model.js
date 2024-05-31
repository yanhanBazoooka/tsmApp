module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: { //foreign key to user table user_id
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    return Team;
  };
 