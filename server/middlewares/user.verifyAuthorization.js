const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");
const verifyAuth = async (req, res, next) => {
  var token = req.headers.authorization;
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) return res.status(401).json({ msg: "unauthorized" });
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: "unauthorized" });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = verifyAuth;
