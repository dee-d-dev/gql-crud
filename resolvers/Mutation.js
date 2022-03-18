const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UserInputError, AuthenticationError } = require("apollo-server");
const check_auth = require("../utils/auth");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validator");
const Post = require("../models/Post");

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
  },
  login: async (parent, { loginInput: { username, password } }, context) => {
    const { errors, valid } = validateLoginInput(username, password);
    if (!valid) {
      throw new UserInputError("error", { errors });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      errors.general = "User not found";

      throw new UserInputError("Wrong credentials", { errors });
    }
    const token = await jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    return { username, token };
  },
  createPost: async (parent, { input: { body } }, context) => {
    const client = check_auth(context);

    const user = await User.findOne({ username: client.username });

    const new_post = new Post({
      body,
      user: user.id,
      username: user.username,
      created_at: new Date(),
    });

    const post = await new_post.save();

    context.pubsub.publish("NEW_POST", { newPost: post });

    return post;
  },

  deletePost: async (parent, { postId }, context) => {
    const user = check_auth(context);
    try {
      const post = await Post.findById(postId);
      if (user.username === post.username) {
        await post.delete();
        return "post deleted";
      }
      throw new AuthenticationError("Action not allowed");
    } catch (err) {
      throw new Error(err);
    }
  },
  createComment: async (parent, { postId, body }, context) => {
    const { username } = check_auth(context);

    if (body.trim() === "") {
      throw new UserInputError("Empty comment", {
        errors: {
          body: "comment body cannot be empty",
        },
      });
    }

    const post = await Post.findById(postId);

    if (post) {
      post.comments.unshift({
        body,
        username,
        created_at: new Date(),
      });

      await post.save();
      return post;
    }

    throw new UserInputError("post not found");
  },
  deleteComment: async (parent, { postId, commentId }, context) => {
    const { username } = check_auth(context);
    const post = await Post.findById(postId);

    if (post) {
      const commentIdx = post.comments.findIndex((c) => c.id == commentId);

      if (post.comments[commentIdx].username === username) {
        post.comments.splice(commentIdx, 1);

        await post.save();
        return post;
      }
      throw new AuthenticationError("Action not allowed");
    }
    throw new UserInputError("Post not found");
  },

  likePost: async (parent, { postId }, context) => {
    const { username } = check_auth(context);
    const post = await Post.findById(postId);

    if (post) {
      if (post.likes.find((like) => like.username === username)) {
        //already liked, unlike post
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        //not liked, like post
        post.likes.push({
          username,
          created_at: new Date(),
        });
      }

      await post.save();
    } else {
      throw new UserInputError("Post not found");
    }

    return post;
  },
};
