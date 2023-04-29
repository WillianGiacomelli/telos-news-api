const jwt = require("jsonwebtoken");

const { authorDatabase } = require("./authors.controllers");

const { JWT_SECRET } = require("../config/env");

const { compareHash } = require("../utils/hashProvider");

const login = async (request, response) => {
  const { email, password } = request.body;

  const author = authorDatabase.find((a) => a.email === email);

  if (!author) {
    return response.status(400).json({
      error: "@authenticate/login",
      message: "Invalid email or password",
    });
  }

  const isValidPassword = await compareHash(password, author.password);

  if (!isValidPassword) {
    return response.status(400).json({
      error: "@authenticate/login",
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(author, JWT_SECRET, {
    expiresIn: "1h",
  });

  const authorLoged = { ...author };

  delete authorLoged.password;

  return response.json({ ...authorLoged, token });
};

module.exports = { login };
