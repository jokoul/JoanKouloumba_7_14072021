const http = require("http");

//importation de l'application express
const app = require("./app");

//Fonctions d'optimisation du fichier server.js:
//fonction "normalizePort" renvoie un port qu'il soit fournit sous forme de numéro ou de chaîne de caractère.
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Définition du port dans l'espace globale.
const port = normalizePort(process.env.PORT || "3000");

//Réglage du port sur lequel l'application doit écouter les requêtes frontend.
app.set("port", port);

//fonction "errorHandler" recherche et gère les erreurs.
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port" + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//création du server
const server = http.createServer(app);

//Enregistrement d'écouteurs d'événement
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port" + port;
  console.log("listening on " + bind);
});

//le server écoute sur le port
server.listen(port);
