const express = require("express");

const app = express();

const { PORT } = require("./config/env");

app.use(express.json());

app.listen(PORT, () => {
  //Define a porta que será ouvida ou no caso, terá a aplicação executada
  console.log(`API running on port ${PORT}`);
});
