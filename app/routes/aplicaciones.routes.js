module.exports = (app) => {
  const aplicaciones = require("../controller/aplicaciones.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.put("/", aplicaciones.create);
  router.get("/", aplicaciones.todos);
  router.delete("/", aplicaciones.delete);
  app.use("/api/aplicaciones", router);
};
