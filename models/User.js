const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: true,
});

const User = mongoose.model("users", user_schema);

module.exports = User;
