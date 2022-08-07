const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    await console.log("database is hooked");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connect;
