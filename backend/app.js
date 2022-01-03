//Importation du package "express"
const express = require("express");

//création de l'application express
const app = express();

//Importation du package "helmet" pour sécuriser l'application contre certaines vulnérabilités.
const helmet = require("helmet");

//Importation du package "path" qui donne accès au chemin du système de fichier server.
const path = require("path");

//Importation du package CORS qui permet de configurer les restrictions de sécurité des en-tête HTTP.
const cors = require("cors");

//Importation des routers
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const countRoutes = require("./routes/counter");
//Importation du fichier de configuration de la BD
const sequelize = require("./config/sequelizeDb");

//connection à la base de donné Mysql
sequelize
  .authenticate()
  .then(() => {
    sequelize
      .sync()
      .then(() => console.log("The models are sucessfully synchronized !"))
      .catch((error) => console.log(error));
  })
  .catch((error) =>
    console.error("Failed to connect to the database : ", error)
  );

//middleware permettant de transformer les objets json en objet javascript
app.use(express.json());

//Sécurisation de l'application via l'inclusion d'en-tête configurée (ex: Content-Security-Policy, X-XSS-Protection, X-DNS-Prefetch-Control, Strict-Transport-Security)
app.use(helmet());

//middleware de configuration pour lever les restrictions de sécurité CORS.
app.use(cors());

//middleware de réponse aux requêtes de la route "/image". Il sert le dossier "images".
app.use("/images", express.static(path.join(__dirname, "images")));

//middleware de réponse aux requêtes des routes racines.
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/counters", countRoutes);

module.exports = app;
