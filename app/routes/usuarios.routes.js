module.exports = (app) => {
  const usuarios = require("../controller/usuarios.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.put("/", usuarios.create);
  router.get("/", usuarios.todos);
  router.get("/login", usuarios.login);
  router.delete("/", usuarios.delete);
  app.use("/api/usuarios", router);
};
