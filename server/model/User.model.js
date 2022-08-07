const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  userName: { type: String },
  email: String,
  password: { type: String },
  pfp: { type: String },
});
module.exports = mongoose.model("User", schema);
