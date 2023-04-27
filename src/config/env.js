require("dotenv").config();

module.exports = {
  PORT: process.env.port,
  JWT_SECRET: process.env.JWT_SECRET,
};
