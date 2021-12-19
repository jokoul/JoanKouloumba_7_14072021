const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const envDatabase = process.env.MYSQL_DATABASE;
const envUsername = process.env.MYSQL_USERNAME;
const envPassword = process.env.MYSQL_PASSWORD;
const envHost = process.env.MYSQL_HOST;

const sequelizeDB = {
  database: envDatabase,
  username: envUsername,
  password: envPassword,
  host: envHost,
  dialect: "mysql",
};

const sequelize = new Sequelize(
  sequelizeDB.database,
  sequelizeDB.username,
  sequelizeDB.password,
  {
    host: sequelizeDB.host,
    dialect: sequelizeDB.dialect,
  }
);

module.exports = sequelize;
