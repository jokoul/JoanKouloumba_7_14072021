const PostLiked = require("../models/PostLiked");
const PostDisliked = require("../models/PostDisliked");
const Comment = require("../models/Comment");

exports.countLike = (req, res, next) => {
  let numberOfLike = 0;
  let userLike = false;
  const postId = req.body.post_id;
  const userId = req.body.user_id;
  PostLiked.count({
    where: {
      post_id: postId,
    },
  })
    .then((count) => {
      numberOfLike = count;
      PostLiked.findOne({
        where: {
          post_id: postId,
          user_id: userId,
        },
      })
        .then((user) => {
          if (user) {
            userLike = true;
          }
          res.status(200).json({ numberOfLike, userLike });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.countDislike = (req, res, next) => {
  const postId = req.body.post_id;
  const userId = req.body.user_id;
  let numberOfDislike = 0;
  let userDislike = false;
  PostDisliked.count({
    where: {
      post_id: postId,
    },
  })
    .then((count) => {
      numberOfDislike = count;
      PostDisliked.findOne({
        where: {
          post_id: postId,
          user_id: userId,
        },
      })
        .then((user) => {
          if (user) {
            userDislike = true;
          }
          res.status(200).json({ numberOfDislike, userDislike });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.countComment = (req, res, next) => {
  let numberOfComment = 0;
  const postId = req.body.post_id;
  Comment.count({
    where: {
      post_id: postId,
    },
  })
    .then((count) => {
      numberOfComment = count;
      res.status(200).json({ numberOfComment });
    })
    .catch((error) => res.status(400).json({ error }));
};
