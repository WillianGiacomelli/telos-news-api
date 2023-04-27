const { Router } = require("express");

const newsController = require("../controllers/news.controllers");

const { verifyAutenticate } = require("../midllewares/verifyAutentication");

const routes = Router();

routes.get("/news", newsController.list);
routes.get("/news/:id", newsController.getById);

routes.post("/news", verifyAutenticate, newsController.create);

routes.put("./news/:id", newsController.update);

routes.delete("./news/:id", newsController.remove);

module.exports = routes;
