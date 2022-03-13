const { ApolloServer } = require("apollo-server");
const Post = require("../models/Post");

exports.Query = {
  async getPosts() {
    console.log("posts");
    const posts = await Post.find();
    console.log(posts);
    return posts;
  },
};
