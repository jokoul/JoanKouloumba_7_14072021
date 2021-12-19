const multer = require("multer");

//Importation du package "path" qui donne accès au chemin du système de fichier server.
const path = require("path");

//création d'un tableau de mime-type valable
const MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/gif",
];

//Filtrage des fichiers entrants en fonction de leur mime-type
const filterFile = (req, file, callback) => {
  if (MIME_TYPES.includes(file.mimetype)) {
    callback(null, true);
  } else {
    return callback(
      new Error("Image file extension accepted : png, jpg, jpeg, gif, webp"),
      false
    );
  }
};

//création d'un objet de configuration pour les images de post
const postStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/posts");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0];
    const newName = name.split(" ").join("_") + Math.floor(Math.random() * 100);
    const extension = path.extname(file.originalname);
    callback(null, newName + "_" + Date.now() + extension);
  },
});

//création d'un objet de configuration pour les images de profil
const profilStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/profils");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0];
    const newName = name.split(" ").join("_") + Math.floor(Math.random() * 100);
    const extension = file.originalname.split(".")[1];
    callback(null, newName + "_" + Date.now() + "." + extension);
  },
});

exports.post = multer({ filterFile, storage: postStorage }).single("image_url");
exports.profil = multer({ filterFile, storage: profilStorage }).single(
  "profil"
);
