const Usuarios = require("../models/usuarios.models");
const bcrypt = require("bcryptjs");

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

  const usuario = new Usuarios({
    nombre_user: req.body.nombre_user,
    contrasena: req.body.contrasena,
  });

};

exports.login = (req, res) => {
  const nombre_user = req.body.nombre_user;
  const contrasena = req.body.contrasena;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err
    bcrypt.hash(req.body.contrasena, salt, function (err, hash) {
      const comparacion = hash;
      console.log(comparacion);
      // Usuarios.login(nombre_user, comparacion, (err, data) => {
      //   if (err)
      //     res.status(500).send({
      //       message:
      //         err.message || "Some error occurred while retrieving tutorials.",
      //     });
      //   else res.send(data);
      // });
    });
  });
  // Usuarios.login(nombre_user, contrasena, (err, data) => {
  //   if (err)
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving tutorials.",
  //     });
  //   else res.send(data);
  // });
};



//////COMENTARIOS/////
//El usuario siempre debe ser unico, establecer unique en la tabla de la base de datos
//se debe verifica con la consulta que el usuario no este actualmente ya ingresado en la base de datos.

//Se tiene que crear una consulta que llame los datos de las persona para poder comparar
//con bcrypt la contraseña de la base de datos junto con la contraseña enviada..