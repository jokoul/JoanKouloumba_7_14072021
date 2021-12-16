const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");

const PostDisliked = sequelize.define(
  "PostDisliked",
  {
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PostDisliked;
