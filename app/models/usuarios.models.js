const mysql = require("../config/db.config");
const bcrypt = require("bcryptjs");

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

Usuarios.login = (nombre_user, password, result) => {
  let query = `select * from usuarios where nombre_user = BINARY '${nombre_user}'`;
  mysql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else if (!res.length) {
      result('null');
    } else {
      //result(null, res);
      bcrypt.compare(password, res[0].contrasena, function (err, resultado) {
        if (!false) {
          result(null, res);
        } else {
          console.log('no encontrado');
        }
      });
    }
  });
}
module.exports = Usuarios;
