const express = require("express");
const {
  register,
  login,
  Auth,
  getAll,
  getOne,
} = require("../controllers/user.controller");
const {
  registerRules,
  validator,
  loginRules,
} = require("../middlewares/user.validator");
const verifyAuth = require("../middlewares/user.verifyAuthorization");
const router = express.Router();
router.post("/register", registerRules(), validator, register);
router.post("/login", loginRules(), validator, login);
router.get("/auth", verifyAuth, Auth);
router.get("/:userId", getOne);

module.exports = router;
