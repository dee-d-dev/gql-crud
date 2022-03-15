const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.Mutation = {
  register: async (
    parent,
    { registerInput: { username, password, email } },
    context
  ) => {
    //validate user, encrypt password
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

    return {
      username: username,
      token: token,
      email: email,
    };
  },
};
