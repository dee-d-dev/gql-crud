exports.validateRegisterInput = (username, email, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "username cannot be empty";
  }
  if (email.trim() === "") {
    errors.email = "email cannot be empty";
  } else {
    const regEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email addresss";
    }
  }
  if (password.trim() === "") {
    errors.password = "password cannot be empty";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

exports.validateLoginInput = (username, password) => {
  const errors = {};

  // if (email.trim() === "") {
  //   errors.email = "email cannot be empty";
  // }
  if (username.trim() === "") {
    errors.email = "username cannot be empty";
  }
  if (password.trim() === "") {
    errors.password = "password cannot be empty";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};
