const { Router } = require("express");

const routes = Router();

const authorsController = require("../controllers/authors.controllers");

routes.get("/authors", authorsController.list);

routes.get("/authors/:id", authorsController.getById);

routes.post("/authors", authorsController.create);

routes.put("/authors/:id", authorsController.update);

routes.delete("/authors/:id", authorsController.remove);

module.exports = routes;
