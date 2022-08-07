const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  conversationId: String,
  pfp: String,
  content: String,
  author: String,
  date: String,
});
module.exports = mongoose.model("Message", schema);
