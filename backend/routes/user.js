const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//création du router pour user
const router = express.Router();

//importation du contrôleurs user
const userCtrl = require("../controllers/user");

router.post("/register", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/accounts/:user_id", auth, userCtrl.getAccount);
router.put("/accounts/:user_id", auth, multer.profil, userCtrl.modifyAccount);
router.delete("/accounts/:user_id", auth, userCtrl.deleteAccount);
router.get("/moderator/:user_id", auth, userCtrl.getModerator);

module.exports = router;
