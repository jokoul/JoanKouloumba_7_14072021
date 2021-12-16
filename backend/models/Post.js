const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");
const PostModerated = require("./PostModerated");
const Comment = require("./Comment");
const PostDisliked = require("./PostDisliked");
const PostLiked = require("./PostLiked");

const Post = sequelize.define("Post", {
  post_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  post_text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

//Définition d'une relation un à plusieurs entre la table Post et Comment avec le paire d'association "hasMany" et "belongsTo"
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(Post);

Post.hasMany(PostLiked, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostLiked.belongsTo(Post);

Post.hasMany(PostDisliked, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostDisliked.belongsTo(Post);

Post.hasOne(PostModerated, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostModerated.belongsTo(Post);

module.exports = Post;
