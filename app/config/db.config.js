require("dotenv").config();
const sql = require("mysql");

const mysql = sql.createConnection({
  database: process.env.database,
  host: process.env.host,
  password: process.env.password,
  user: process.env.user,
});

mysql.connect((err) => {
    if(err){
        console.log('Ha ocurrido el siguiente error: '+err);
    }else{
        console.log('Se ha conectado correctamente');
    }
});

module.exports = mysql;
