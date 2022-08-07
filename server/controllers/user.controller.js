const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    age,
    email,
    password,
    confirmPassword,
    pfp,
  } = req.body;
  try {
    const existentUser = await UserModel.findOne({ email });
    if (existentUser)
      return res.status(402).json({ msg: "email already exists!" });
    if (password !== confirmPassword)
      return res.status(402).json({ msg: "passwords do not match!" });
    const newUser = new UserModel({
      firstName,
      lastName,
      userName,
      age,
      email,
      password,
      confirmPassword,
      pfp,
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    await newUser.save();
    var payload = {
      id: newUser._id,
      userName,
      email,
    };
    var token = jwt.sign(payload, process.env.SECRET_KEY);
    res.status(200).json({
      token,
      user: {
        firstName,
        lastName,
        userName,
        age,
        email,
        password,
        _id: newUser._id,
        pfp,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
exports.login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await UserModel.findOne({ userName });
    if (!user) return res.status(401).json({ msg: "userName does not exist!" });
    const isMatch = await bcrypt.compare(password, user.password);
    const payload = {
      id: user._id,
      userName,
    };
    var token = jwt.sign(payload, process.env.SECRET_KEY);
    if (isMatch)
      return res.status(200).json({
        token,
        user: {
          userName: user.userName,
          password: user.password,
          _id: user._id,
        },
      });
    else
      return res.status(401).json({ msg: "password or email are incorrect" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.Auth = async (req, res) => {
  res.send(req.user);
};

exports.getOne = async (req, res) => {
  try {
    const foundUser = await UserModel.findById(req.params.userId);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
