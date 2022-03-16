const { ApolloServer, gql } = require("apollo-server");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { typeDefs } = require("./schema");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("db connected");
});

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
  context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
