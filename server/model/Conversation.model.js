const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  members: Array,
});
module.exports = mongoose.model("conversation", schema);
