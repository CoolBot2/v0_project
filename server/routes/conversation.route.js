const { convo, getConvo } = require("../controllers/conversation.controller");

const router = require("express").Router();
router.post("/convo", convo);
router.get("/convo/:userId", getConvo);
module.exports = router;
