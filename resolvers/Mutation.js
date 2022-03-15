const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UserInputError } = require("apollo-server");

exports.Mutation = {
  register: async (
    parent,
    { registerInput: { username, password, email } },
    context
  ) => {
    //check if user exists
    // const find_user = User.findOne({email: email });

    // if (find_user) {
    //   throw new UserInputError("User already has an account");
    // }

    //validate user, encrypt password
    console.log(password);
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
  },
};
