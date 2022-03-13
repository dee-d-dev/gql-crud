const { ApolloServer, gql } = require("apollo-server");
const { Query } = require("./resolvers/Query");
const { typeDefs } = require("./schema");
const mongoose = require("mongoose");
const Post = require("./models/Post");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("db connected");
});

const server = new ApolloServer({
  typeDefs,
  resolvers:{Query},
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
