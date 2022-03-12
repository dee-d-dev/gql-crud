const { ApolloServer, gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query{
    sayHi: String
  }
`