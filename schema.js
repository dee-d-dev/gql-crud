const { ApolloServer, gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Post {
    id: ID!
    body: String!
    created_at: String!
    username: String!
    user: String
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    created_at: String!
    username: String!
    body: String!
  }

  type Like {
    id: ID!
    created_at: String!
    username: String!
  }

  input registerInput {
    username: String!
    password: String!
    email: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    token: String!
    created_at: String
  }

  input loginInput {
    username: String!
    password: String!
  }

  input newPost {
    body: String!
  }
  type Mutation {
    register(registerInput: registerInput): User!
    login(loginInput: loginInput!): User
    createPost(input: newPost!): Post
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String, commentId: String!): Post!
    likePost(postId: ID!): Post!
  }

  type Subscription {
    post: Post
  }
`;
