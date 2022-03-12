const { ApolloServer } = require("apollo-server");
const { Query } = require("./resolvers/Query");
const { typeDefs } = require("./schema");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, ()=> {
  console.log('db connected')
});

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query },
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
