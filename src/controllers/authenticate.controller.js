const jwt = require("jsonwebtoken");

const { authorDatabase } = require("./authors.controllers");

const { JWT_SECRET } = require("../config/env");

const { compareHash } = require("../utils/hashProvider");
const { response } = require("express");

const login = async (request, response) => {
  const { email, password } = request.body;

  const author = authorDatabase.find((a) => a.email === email);

  if (!author) {
    return response.status(400).json({
      error: "@authenticate/login",
      message: "Invalid email or password",
    });
  } else {
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

    delete author.password;

    return response.json({ ...author, token });
  }
};

module.exports = { login };
