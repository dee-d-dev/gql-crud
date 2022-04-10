
const Post = require("../models/Post");

exports.Query = {
  async getPosts() {
    const posts = await Post.find();

    return posts;
  },
  async getPost(parent, { id }, context) {
    const post = await Post.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },
};
