const express = require("express");
const {
  sendMsg,
  showMsg,
  deleteMsg,
} = require("../controllers/message.controller");
const router = express.Router();
router.post("/sendMsg", sendMsg);
router.get("/showMsg/:conversationId", showMsg);
router.delete("/deleteMsg/:messageId", deleteMsg);
module.exports = router;
