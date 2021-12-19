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
