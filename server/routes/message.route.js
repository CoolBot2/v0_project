const express = require("express");
const { sendMsg, showMsg } = require("../controllers/message.controller");
const router = express.Router();
router.post("/sendMsg", sendMsg);
router.get("/showMsg/:conversationId", showMsg);
module.exports = router;
