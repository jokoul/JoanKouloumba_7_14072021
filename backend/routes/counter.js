const express = require("express");
const router = express.Router();

const counterCtrl = require("../controllers/counter");

const auth = require("../middleware/auth");

router.post("/like", auth, counterCtrl.countLike);
router.post("/dislike", auth, counterCtrl.countDislike);
router.post("/comment", auth, counterCtrl.countComment);

module.exports = router;
