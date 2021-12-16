const sequelize = require("sequelize");
//Importation de la classe Sequelize par destructuration du package sequelize.
const { Sequelize } = require("sequelize");
//Importation des opérateurs liés à l'attribut de filtrage "where"
const Op = Sequelize.Op;

//Importation des modèles de table relationnelle
const Comment = require("../models/Comment");
const CommentModerated = require("../models/CommentModerated");
const User = require("../models/User");

exports.getAllComment = (req, res, next) => {
  const postId = req.params.post_id;
  Comment.findAll({
    where: {
      post_id: postId,
      [Op.notIn]: sequelize.literal("SELECT comment_id FROM CommentModerateds"),
    },
    include: [
      {
        model: User,
        attributes: ["firstname", "lastname", "profil"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
  const postId = req.params.post_id;
  const userId = req.body.user_id;
  const commentText = req.body.comment_text;
  Comment.create({
    post_id: postId,
    user_id: userId,
    comment_text: commentText,
  })
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  const commentText = req.body.comment_text;
  const commentId = req.params.comment_id;
  Comment.update(
    {
      comment_text: commentText,
    },
    {
      where: {
        comment_id: commentId,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Commentaire modifié" }))
    .catch((error) => res.status(403).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  Comment.destroy({
    where: {
      comment_id: commentId,
    },
  })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.moderateComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  const moderate = req.body.moderate;
  if (moderate) {
    //si l'utilisateur est un modérateur
    CommentModerated.create({
      comment_id: commentId,
    })
      .then(() => res.status(201).json({ message: "Commentaire modéré !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    //si l'utilisateur n'est plus modérateur
    CommentModerated.destroy({
      where: {
        comment_id: commentId,
      },
    })
      .then(() =>
        res
          .status(200)
          .json({ message: "Modération de commentaire supprimée !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};
