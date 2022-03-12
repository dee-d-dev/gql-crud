const { ApolloServer } = require("apollo-server");

exports.Query = {
  sayHi: () => {
    return "Hi";
  },
};
