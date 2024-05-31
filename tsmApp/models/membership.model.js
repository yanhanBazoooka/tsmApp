module.exports = (sequelize, Sequelize) => {
    const Membership = sequelize.define("membership", {
      userId: { //foreign key to user table user_id
        type: Sequelize.INTEGER,
        references: {model: "users", key: 'id'},
        allowNull: false
      },
      teamId: {//foreign key to team table team_id
        type: Sequelize.INTEGER,
        references: {model: "teams", key: 'id'},
        allowNull: false
      }
    });
    return Membership;
  };
 