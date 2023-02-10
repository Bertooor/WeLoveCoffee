const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USUARIO, MYSQL_CONTRASENA, MYSQL_BD } = process.env;

let conexion;

const crearConexion = async () => {
  if (!conexion) {
    conexion = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USUARIO,
      password: MYSQL_CONTRASENA,
      database: MYSQL_BD,
      timezone: "Z",
    });
  }

  return await conexion.getConnection();
};

module.exports = { crearConexion };
