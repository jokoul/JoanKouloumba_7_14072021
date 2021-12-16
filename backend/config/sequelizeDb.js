const { Sequelize, DataTypes } = require("sequelize");

const sequelizeDB = {
  database: "projet7",
  username: "root",
  password: "",
  host: "localhost",
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
