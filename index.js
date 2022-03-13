const { ApolloServer, gql } = require("apollo-server");
// const { Query } = require("./resolvers/Query");
// const { typeDefs } = require("./schema");
const mongoose = require("mongoose");
const Post = require("./models/Post");
require("dotenv").config();



mongoose.connect(process.env.MONGO_URI, () => {
  console.log("db connected");
});

const typeDefs = gql`
  type Query {
    getPosts: [Post]
  }

  type Post {
    id: ID!
    body: String!
    created_at: String!
    username: String!
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      console.log("posts");
      const posts = await Post.find();
      return posts;
      
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
