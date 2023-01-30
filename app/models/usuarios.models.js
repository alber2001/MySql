const mysql = require("../config/db.config");

const Usuarios = function (usuarios) {
  this.nombre_user = usuarios.nombre_user;
  this.contrasena = usuarios.contrasena;
};

Usuarios.create = (newUsuarios, result) => {
  mysql.query("INSERT INTO usuarios SET ?", newUsuarios, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("usuario creado: ", { id: res.insertId, ...newUsuarios });
    result(null, { id: res.insertId, ...newUsuarios });
  });
};

Usuarios.todos = (nombre_user, result) => {
  let query = "SELECT * FROM usuarios";

  if (nombre_user) {
    query += ` WHERE nombre_user LIKE '%${nombre_user}%'`;
  }

  mysql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuarios.delete = (id_usuario, result) => {
  mysql.query("DELETE FROM usuarios WHERE id_usuario = ?", id_usuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    //console.log("deleted tutorial with id: ", id_usuario);
    result(null, res);
  });
};

module.exports = Usuarios;
