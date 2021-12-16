const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");

const PostModerated = sequelize.define(
  "PostModerated",
  {
    post_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PostModerated;
