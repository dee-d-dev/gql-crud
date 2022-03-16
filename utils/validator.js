exports.validateRegisterInput = (username, email, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.email = "username cannot be empty";
  }
  if (email.trim() === "") {
    errors.email = "username cannot be empty";
  } else {
    const regEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      error.mail = "Email must be a valid email addresss";
    }
  }
  if (password.trim() === "") {
    errors.password = "password cannot be empty";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};
