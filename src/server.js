const express = require("express");

const authorRoutes = require("./routes/authors.routes");

const app = express();

const { PORT } = require("./config/env");

app.use(express.json());

app.use(authorRoutes);

app.listen(PORT, () => {
  //Define a porta que será ouvida ou no caso, terá a aplicação executada
  console.log(`API running on port ${PORT}`);
});
