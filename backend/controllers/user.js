const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Importation du package "fs" qui permet d'accéder aux opérations liés au système de fichier.
const fs = require("fs");
const User = require("../models/User");
const Moderator = require("../models/Moderator");
//importation de dotenv pour l'utilisation des variables d'environnement.
require("dotenv").config();
const secretKey = process.env.TOKEN_SECRET_KEY;

//définition et Exportation des fonctions callback du controleur
exports.signup = async (req, res, next) => {
  //Hashage du mot de passe avant sauvegarde dans la base
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.scope("withPassword")
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Aucun utilisateur trouvé avec cet email !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Le mot de passe est incorrect !" });
          }
          res.status(200).json({
            userId: user.user_id,
            token: jwt.sign({ userId: user.user_id }, `${secretKey}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAccount = (req, res, next) => {
  const userId = req.params.user_id;
  User.findOne({ where: { user_id: userId } })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyAccount = (req, res, next) => {
  const userId = req.params.user_id;
  //Suppression de l'ancien fichier images si il existe
  User.findByPk(userId)
    .then((user) => {
      if (user.profil) {
        const filename = user.profil.split("images/profils/")[1];
        //Suppression du fichier images associé au chemin puis fonction callback de suppression de la ressource en base
        fs.unlink(`images/profils/${filename}`, () => {
          console.log("Supression du fichier image !");
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));

  const accountObject = req.file
    ? {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profil: `${req.protocol}://${req.get("host")}/images/profils/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.update({ ...accountObject }, { where: { user_id: userId } })
    .then(() =>
      res.status(200).json({ message: "Compte modifié avec succès !" })
    )
    .catch((error) => res.status(403).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
  const userId = req.params.user_id;
  User.findByPk(userId)
    .then((user) => {
      if (user.profil) {
        const filename = user.profil.split("/profils/")[1];
        fs.unlink(`images/profils/${filename}`, () => {
          User.destroy({ where: { user_id: userId } })
            .then(() => res.status(200).json({ message: "Compte supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        User.destroy({ where: { user_id: userId } })
          .then(() => res.status(200).json({ message: "Compte supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getModerator = (req, res, next) => {
  const userId = req.params.user_id;
  Moderator.findOne({ where: { user_id: userId } })
    .then((moderator) => {
      if (moderator) {
        res.status(200).json({ moderator: true });
      } else {
        res.status(200).json({ moderator: false });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
