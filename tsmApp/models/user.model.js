// DB schema
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return User;
  };
 