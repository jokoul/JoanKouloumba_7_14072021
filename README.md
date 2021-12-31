OCR - Parcours developpeur web - P7 - Groupomania

objectif : Créez un réseau social d’entreprise

# Backend

1. Installation :

a) A partir du dossier `backend`, faire `npm install`

b) Créer un fichier `.env` à partir du template `.env_sample`, puis renseignez-y vos données de connexion dans les variables d'environnement.

2. Lancement :

a) Lancer votre SGBD (pour moi : MySQL), puis créer votre `database` si elle n'est pas déjà existant. Lors du lancement de l'api à l'étape suivante (b), si vous avez une erreur du type :
`Error: Index column size too large. The maximum column size is 767 bytes.`
Alors, taper dans votre SGBD la requête SQL suivante :
`SET GLOBAL innodb_default_row_format = 'DYNAMIC';`.

b)Lancer le server backend en effectuant : `nodemon server` ou `node server` selon si vous avez installé nodemon ou pas. (moi : avec nodemon)

## Frontend

1. Installation :

A partir du dossier `frontend`, faire `npm install`

2. Lancement :

Taper la commande `npm run serve`

## Moderator

Pour se connecter en tant que modérateur :

1. Déconnectez-vous du réseau social.

2. faites une requête SQL pour ajouter votre `user_id` dans la table `moderator`.

3. Reconnectez-vous sur le réseau social.
