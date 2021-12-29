const sequelize = require("../config/sequelizeDb");
const { Sequelize, DataTypes } = require("sequelize");
const Post = require("./Post");
const Comment = require("./Comment");
const Moderator = require("./Moderator");
const PostLiked = require("./PostLiked");
const PostDisliked = require("./PostDisliked");

//Définition du modèle de donné qui sera utilisé pour l'écriture en base
const User = sequelize.define(
  "User",
  {
    //définition des attributs du modèle
    user_id: {
      type: DataTypes.UUID, //"Universally unique identifier" permet d'identifier l'objet de manière unique.
      defaultValue: Sequelize.UUIDV1, //for automatic generation
      unique: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING, //équivaut à VARCHAR(255) selon la doc sequelize
      unique: true,
      allowNull: false,
      validate: {
        is: /^([a-zA-Z0-9éèêëàâäîïôöûü_.+-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]{2,5})$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    profil: {
      type: DataTypes.STRING,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

//Création des relations entre notre table User et les autres tables
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Post.belongsTo(User, { foreignKey: "user_id" });

//Les associations sont définis par paire afin de permettre au 2 tables de prendre connaissance de l'existence de la relation.
User.hasMany(PostLiked, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostLiked.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(PostDisliked, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostDisliked.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Moderator, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Moderator.belongsTo(User, { foreignKey: "user_id" });

module.exports = User;
