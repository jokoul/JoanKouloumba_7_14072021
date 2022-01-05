const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

router.get("/:post_id", auth, commentCtrl.getAllComment);
router.post("/:post_id", auth, commentCtrl.createComment);
router.put("/:comment_id", auth, commentCtrl.modifyComment);
router.delete("/:comment_id", auth, commentCtrl.deleteComment);
router.post("/:comment_id/moderate", auth, commentCtrl.moderateComment);
router.get("/:user_id/Profile", auth, commentCtrl.getCommentProfile);

module.exports = router;
