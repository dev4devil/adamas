const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.status = !isEmpty(data.status) ? data.status : true;

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }
  if (validator.isEmpty(data.email)) {
    if (!validator.isEmpty(data.email)) {
      errors.email = "Email is invalid";
    } else errors.email = "Email is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (validator.isEmpty(data.role)) {
    errors.role = "Role is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password is required";
  }
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
