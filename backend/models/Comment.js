const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");
const CommentModerated = require("./CommentModerated");

const Comment = sequelize.define("Comment", {
  comment_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: Sequelize.UUIDV4,
  },
  post_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  comment_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

//Définition de la relation un à un avec le paire de type d'association "hasOne" et "belongsTo"
Comment.hasOne(CommentModerated, {
  foreignKey: "comment_id", //On change le nom par défaut "commentId" avec le nom que l'on a définit.
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CommentModerated.belongsTo(Comment, { foreignKey: "comment_id" });

module.exports = Comment;
