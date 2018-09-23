const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.repassword = !isEmpty(data.repassword) ? data.repassword : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (Validator.isEmpty(data.repassword)) {
    errors.repassword = "Confirm password field is required.";
  }

  if (!Validator.equals(data.password, data.repassword)) {
    errors.repassword = "Password must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
