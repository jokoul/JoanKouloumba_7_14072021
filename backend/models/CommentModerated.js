const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");

const CommentModerated = sequelize.define(
  "CommentModerated",
  {
    comment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    //définitions des options du modèle
    timestamps: false,
  }
);

module.exports = CommentModerated;
