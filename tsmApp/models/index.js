const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
 host: dbConfig.HOST,
 dialect: dbConfig.dialect,
 operatorsAliases: false,
 pool: {
   max: dbConfig.pool.max,
   min: dbConfig.pool.min,
   acquire: dbConfig.pool.acquire,
   idle: dbConfig.pool.idle
 }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.teams = require("./team.model.js")(sequelize, Sequelize);
db.mememberships = require("./membership.model.js")(sequelize, Sequelize);
db.users.hasMany(db.tasks);
db.users.hasMany(db.mememberships);
db.teams.hasMany(db.mememberships);
module.exports = db;