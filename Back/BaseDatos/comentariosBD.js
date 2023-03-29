const { generaError } = require("../funcionesAyuda");
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

const listaComentariosBD = async (tema_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [listaComentarios] = await conexion.query(
      `
      SELECT *
      FROM comentarios
      WHERE tema_id = ?
      ORDER BY fecha_creacion ASC
    `,
      [tema_id]
    );

    return listaComentarios;
  } finally {
    if (conexion) conexion.release();
  }
};

const comentarioBD = async (comentario_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [comentario] = await conexion.query(
      `
      SELECT *
      FROM comentarios
      WHERE id = ?
    `,
      [comentario_id]
    );

    if (comentario.length === 0) {
      generaError(`El comentario con id: ${comentario_id} no existe.`, 404);
    }

    return comentario[0];
  } finally {
    if (conexion) conexion.release();
  }
};

const imagenesUsuarioBD = async (id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [imagenes] = await conexion.query(
      `
      SELECT imagen
      FROM comentarios
      WHERE id = ?
    `,
      [id]
    );

    return imagenes;
  } finally {
    if (conexion) conexion.release();
  }
};

const borrarComentarioBD = async (comentario_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    await conexion.query(
      `
      DELETE 
      FROM comentarios
      WHERE id = ?
    `,
      [comentario_id]
    );

    return;
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = {
  nuevoComentarioBD,
  listaComentariosBD,
  comentarioBD,
  borrarComentarioBD,
  imagenesUsuarioBD,
};
