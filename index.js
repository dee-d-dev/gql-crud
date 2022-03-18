const { ApolloServer, gql, PubSub } = require("apollo-server");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { subscription } = require("./resolvers/Subscription");
const { typeDefs } = require("./schema");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("db connected");
});

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation, subscription },
  context: ({ req, res }) => ({ req, pubsub }),
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
