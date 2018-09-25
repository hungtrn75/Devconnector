const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 400 })) {
    errors.text = "Post must at least 10 to 400 characters.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
