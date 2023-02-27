const Usuarios = require("../models/usuarios.models");


exports.create = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err
    bcrypt.hash(req.body.contrasena, salt, function (err, hash) {
      const usuario = new Usuarios({
        nombre_user: req.body.nombre_user,
        contrasena: hash,
      });

      Usuarios.create(usuario, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial.",
          });
        else res.send(data);
      });
    });
  });
};

exports.todos = (req, res) => {
  const nombre_user = req.query.nombre_user;

  Usuarios.todos(nombre_user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Usuarios.delete(req.body.id_usuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro el usuario con el id: ${req.body.id_usuario}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.body.id_usuario
        });
      }
    } else res.send({ message: `Usuario fue eliminado correctamente!` });
  })
}


exports.login = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Usuarios.login(req.body.nombre_user, req.body.contrasena, (err, data) => {
    if (!data) {
      res.status(406).send({ message: `USUARIO O CONTRASEÑA ERRONEOS` });
    } else {
      res.status(200).send({ message: `Usuario encontrado` });
    }
  });
};