const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const auth_header = context.req.headers.authorization;
  //   console.log(auth_header);

  if (auth_header) {
    const token = auth_header.split(" ");
    // console.log(token);
    const bearer_token = token[1];
    // console.log(bearer_token)
    if (bearer_token) {
      try {
        const user = jwt.verify(bearer_token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    }
    throw new Error("Token must be provided");
  }
  throw new Error("authentication header must be provided");
};
