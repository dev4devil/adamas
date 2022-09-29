const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddUser(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
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
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
