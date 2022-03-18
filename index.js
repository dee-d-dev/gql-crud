const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Subscription } = require("./resolvers/Subscription");
const { typeDefs } = require("./schema");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("db connected");
});

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation, Subscription },
  context: ({ req, res }) => ({ req, pubsub }),
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
