const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const auth_header = context.req.headers.authorization;

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
};
