const { crearConexion } = require("./conexionBD");

const nuevoComentarioBD = async (usuario_id, tema_id, texto, imagen = "") => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [comentario] = await conexion.query(
      `
        INSERT INTO comentarios (usuario_id, tema_id, texto, imagen)
        VALUES(?, ?, ?, ?)
    `,
      [usuario_id, tema_id, texto, imagen]
    );

    return comentario.insertId;
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = nuevoComentarioBD;
