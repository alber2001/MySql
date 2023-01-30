module.exports = (app) => {
  const usuarios = require("../controller/usuarios.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", usuarios.create);
  router.get("/", usuarios.todos);
  router.delete("/", usuarios.delete);
  app.use("/api/usuarios", router);
};
