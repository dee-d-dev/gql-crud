const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
  body: String,
  username: String,
  created_at: String,
  comments: [
    {
      body: String,
      username: String,
      created_at: String,
    },
  ],
  likes: [
    {
      username: String,
      created_at: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("post", post_schema);
