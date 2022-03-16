const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const auth_header = context.req.headers.authorization;
  console.log(auth_header);

  if (auth_header) {
    const token = auth_header.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    }
    throw new Error("Token must be provided");
  }
  throw new Error("authentication header must be provided");
};
