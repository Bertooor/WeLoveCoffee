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
      SELECT comentarios.*, usuarios.avatar, usuarios.imagen AS imagenAvatar
      FROM comentarios
      INNER JOIN usuarios ON comentarios.usuario_id = usuarios.id
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

const votosComentarioMGBD = async (comentario_id, usuario_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [votoFavor] = await conexion.query(
      `
      SELECT id
      FROM megusta 
      WHERE comentario_id = ? AND usuario_id = ?
    `,
      [comentario_id, usuario_id]
    );

    if (votoFavor.length > 0) {
      generaError("Ya has valorado este comentario", 400);
    }

    const [votoContra] = await conexion.query(
      `
      SELECT id
      FROM nomegusta 
      WHERE comentarios_id = ? AND usuarios_id = ?
    `,
      [comentario_id, usuario_id]
    );

    if (votoContra.length > 0) {
      generaError("Ya has valorado este comentario", 400);
    }

    await conexion.query(
      `
        INSERT INTO megusta ( comentario_id, usuario_id)
        VALUES (?,?)
      `,
      [comentario_id, usuario_id]
    );
    return;
  } finally {
    if (conexion) conexion.release();
  }
};

const votosComentarioNMGBD = async (comentario_id, usuario_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [votoFavor] = await conexion.query(
      `
      SELECT id
      FROM megusta 
      WHERE comentario_id = ? AND usuario_id = ?
    `,
      [comentario_id, usuario_id]
    );

    if (votoFavor.length > 0) {
      generaError("Ya has valorado este comentario", 400);
    }

    const [votoContra] = await conexion.query(
      `
      SELECT id
      FROM nomegusta 
      WHERE comentarios_id = ? AND usuarios_id = ?
    `,
      [comentario_id, usuario_id]
    );

    if (votoContra.length > 0) {
      generaError("Ya has valorado este comentario", 400);
    }

    await conexion.query(
      `
        INSERT INTO nomegusta (comentarios_id, usuarios_id)
        VALUES (?,?)
      `,
      [comentario_id, usuario_id]
    );
    return;
  } finally {
    if (conexion) conexion.release();
  }
};

const votosBD = async (comentario_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [votosPositivos] = await conexion.query(
      `
      SELECT COUNT(id) AS votosPositivos
      FROM megusta
      WHERE comentario_id = ?
    `,
      [comentario_id]
    );

    const [votosNegativos] = await conexion.query(
      `
      SELECT COUNT(id) As votosNegativos
      FROM nomegusta
      WHERE comentarios_id = ?
    `,
      [comentario_id]
    );

    return {
      ...votosPositivos[0],
      ...votosNegativos[0],
    };
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
  votosComentarioMGBD,
  votosComentarioNMGBD,
  votosBD,
};
