const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");

const Moderator = sequelize.define(
  "Moderator",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
  },
  {
    tableName: "moderator",
    timestamps: false,
  }
);

module.exports = Moderator;
