const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validator");

exports.Mutation = {
  register: async (
    parent,
    { registerInput: { username, password, email } },
    context
  ) => {
    //check if user exists
    let { valid, errors } = validateRegisterInput(username, email, password);
    if (!valid) {
      throw new UserInputError("error", { errors });
    }
    const find_user = await User.findOne({ email: email });

    //validate user, encrypt password
    if (find_user) {
      throw new UserInputError("this email already has an account", {
        errors: {
          username: "This mail already has an account",
        },
      });
    }

    let hashed_password = await bcrypt.hash(password, 12);

    let user = new User({
      username,
      password: hashed_password,
      email,
    });

    user.save((err) => {
      if (err) console.log(err);
    });

    const token = await jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });

    return { username, token, email, password };
    // } else {
    //   throw new UserInputError("User already has an account");
    // }
  },
  login: async (parent, { email, password }, context) => {
    const { errors, valid } = validateLoginInput(email, password);

    const user = await User.findOne({ email: email });

    if (!user) {
      errors.general = "User not found";

      throw new UserInputError("Wrong credentials", { errors });
    }
    const token = await jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    return {email, token};
  },
};
