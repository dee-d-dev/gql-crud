const { ApolloServer } = require("apollo-server");
const { Query } = require("./resolvers/Query");
const { typeDefs } = require("./schema");
const express = require("express");

require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query },
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
