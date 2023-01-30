const Aplicaciones = require("../models/aplicaciones.models");

exports.create = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const aplicacion = new Aplicaciones({
    app_name: req.body.app_name,
  });

  Aplicaciones.create(aplicacion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

exports.todos = (req, res) => {
  const app_name = req.query.app_name;

  Aplicaciones.todos(app_name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Aplicaciones.delete(req.body.id_app, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro la app con el id: ${req.body.id_app}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete app with id " + req.body.id_app,
        });
      }
    } else res.send({ message: `aplicacion fue eliminada correctamente!` });
  });
};
