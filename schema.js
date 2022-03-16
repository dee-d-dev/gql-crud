const { ApolloServer, gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    getPosts: [Post]
  }

  type Post {
    id: ID!
    body: String!
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
    email: String!
    password: String!
  }

  type Mutation {
    register(registerInput: registerInput): User!
    login(loginInput: loginInput): User
  }
`;
