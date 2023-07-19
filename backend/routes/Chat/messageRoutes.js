const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../../controllers/Chat/messageControllers");
const { protect } = require("../../middleware/authMiddleware");
//const auth = require("../middleware/auth")
const router = express.Router();
router.route("/:chatId").get(protect,allMessages);
router.route("/").post(protect,sendMessage);

module.exports = router;
