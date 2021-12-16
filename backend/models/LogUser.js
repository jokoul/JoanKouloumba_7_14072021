const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");

const LogUser = sequelize.define("LogUser", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  test: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = LogUser;
