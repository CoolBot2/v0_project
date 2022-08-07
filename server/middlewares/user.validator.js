const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("firstName", "field required").notEmpty(),
  check("lastName", "field required").notEmpty(),
  check("userName", "field required").notEmpty(),
  check("age", "field required").notEmpty(),
  check("age", "age must be a number").isInt(),
  check("email", "email is incorrect").isEmail(),
  check("password", "password must be more than 6 characters").isLength({
    min: 6,
  }),
];
exports.loginRules = () => [
  check("userName", "username is incorrect").notEmpty(),
  check("password", "password must be more than 6 characters").isLength({
    min: 6,
  }),
];
exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else res.status(500).json({ errors: errors.array() });
};
