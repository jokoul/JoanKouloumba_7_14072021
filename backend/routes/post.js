const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPost);
router.get("/:post_id", auth, postCtrl.getOnePost);
router.post("/", auth, multer.post, postCtrl.createPost);
router.put("/:post_id", auth, multer.post, postCtrl.modifyPost);
router.delete("/:post_id", auth, postCtrl.deletePost);
router.post("/:post_id/like", auth, postCtrl.modifyLikePost);
router.get("/:post_id/moderate", auth, postCtrl.moderatePost);

module.exports = router;
