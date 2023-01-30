const mysql = require("../config/db.config");

const Aplicaciones = function (aplicacion) {
  this.app_name = aplicacion.app_name;  
};

Aplicaciones.create = (newAplicaciones, result) => {
  mysql.query("INSERT INTO aplicaciones SET ?", newAplicaciones, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("usuario creado: ", { id: res.insertId, ...newaplicacion });
    result(null, { id: res.insertId, ...newAplicaciones });
  });
};

Aplicaciones.todos = (app_name, result) => {
  let query = "SELECT * FROM aplicaciones";

  if (app_name) {
    query += ` WHERE app_name LIKE '%${app_name}%'`;
  }

  mysql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("aplicacion: ", res);
    result(null, res);
  });
};

Aplicaciones.delete = (id_app, result) => {
  mysql.query("DELETE FROM aplicaciones WHERE id_app = ?", id_app, (err, res) => {
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

module.exports = Aplicaciones;