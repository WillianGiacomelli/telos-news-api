const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

const verifyAutenticate = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: "@autenticate/missing-token",
      message: "token not sent",
    });
  }
  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer") {
    return response.status(401).json({
      error: "@autenticate/invalid-token",
      message: "token provided is invalid",
    });
  }

  if (!token) {
    return response.status(401).json({
      error: "@autenticate/invalid-token",
      message: "token provided is invalid",
    });
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return response.status(401).json({
        error: "@autenticate/invalid-token",
        message: "token provided is invalid",
      });
    }

    request.author = decoded;

    console.log(decoded);
    return next();
  });
};

module.exports = {
  verifyAutenticate,
};
