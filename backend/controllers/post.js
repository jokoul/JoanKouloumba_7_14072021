const sequelize = require("../config/sequelizeDb");
const { Sequelize } = require("sequelize");
//Importation des opérateurs liés à l'attribut de filtrage "where"
const Op = Sequelize.Op;

const fs = require("fs");

const Post = require("../models/Post");
const PostLiked = require("../models/PostLiked");
const PostDisliked = require("../models/PostDisliked");
const PostModerated = require("../models/PostModerated");
const User = require("../models/User");

//Définition et exportation des fonctions callback
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    where: {
      //On récupère tous les post de la table Post dont l'id n'est pas dans la colonne "post_id" de la table PostModerateds
      post_id: {
        [Op.notIn]: sequelize.literal(`(SELECT post_id FROM PostModerateds)`),
      },
    },
    include: [
      {
        //On crée une jointure (eager loading) avec la table User pour récupérer les colonnes associées
        model: User,
        attributes: ["user_id", "firstname", "lastname", "profil"],
      },
    ],
    //On ordonne le résultat dans l'ordre décroissant des dates
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  const postId = req.params.post_id;
  Post.findOne({
    where: {
      post_id: postId,
    },
    include: [
      {
        model: User,
        attributes: ["user_id", "firstname", "lastname", "profil"],
      },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  Post.create({
    post_text: req.body.post_text,
    image_url: `${req.protocol}://${req.get("host")}/images/posts/${
      req.file.filename
    }`,
    user_id: req.body.user_id,
  })
    .then(() => res.status(201).json({ message: "Publication créée ! " }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  const postId = req.params.post_id;
  Post.update(
    {
      post_text: req.body.post_text,
    },
    {
      where: {
        post_id: postId,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Publication modifiée !" }))
    .catch((error) => res.status(403).json({ error }));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.post_id;
  Post.findByPk(postId)
    .then((post) => {
      const filename = post.image_url.split("/images/posts/")[1];
      fs.unlink(`images/posts/${filename}`, () => {
        Post.destroy({
          where: {
            post_id: postId,
          },
        })
          .then(() =>
            res.status(200).json({ message: "Publication supprimée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyLikePost = (req, res, next) => {
  const like = req.body.like;
  const postId = req.params.post_id;
  const userId = req.body.user_id;
  if (like == 1) {
    PostLiked.create({
      post_id: postId,
      user_id: userId,
    })
      .then(() => res.status(201).json({ message: "Like créé !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (like == -1) {
    PostDisliked.create({
      post_id: postId,
      user_id: userId,
    })
      .then(() => res.status(201).json({ message: "Dislike crée !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (like == 0) {
    PostLiked.findOne({
      where: {
        [Op.and]: [{ user_id: userId }, { post_id: postId }],
      },
    })
      .then((postLike) => {
        if (postLike) {
          PostLiked.destroy({
            where: {
              user_id: userId,
              post_id: postId,
            },
          })
            .then(() => res.status(200).json({ message: "Like supprimée !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));

    PostDisliked.findOne({
      where: {
        user_id: userId,
        post_id: postId,
      },
    })
      .then((postDislike) => {
        if (postDislike) {
          PostDisliked.destroy({
            where: {
              user_id: userId,
              post_id: postId,
            },
          })
            .then(() =>
              res.status(200).json({ message: "Dislike supprimée !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.moderatePost = (req, res, next) => {
  const postId = req.params.post_id;
  const moderate = req.body.moderate;
  if (moderate) {
    PostModerated.create({
      post_id: postId,
    })
      .then(() => res.status(201).json({ message: "Publication modérée !" }))
      .catch((error) => res.status(200).json({ error }));
  } else {
    PostModerated.destroy({
      where: {
        post_id: postId,
      },
    })
      .then(() =>
        res
          .status(200)
          .json({ message: "Modération de publication supprimée !" })
      )
      .catch((error) => res.status(200).json({ error }));
  }
};
