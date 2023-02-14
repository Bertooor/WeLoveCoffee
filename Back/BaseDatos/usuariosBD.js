const { crearConexion } = require("./conexionBD");
const { generaError } = require("../funcionesAyuda");

const nuevoUsuarioBD = async (avatar, correo, contrasena) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [existeCorreo] = await conexion.query(
      `
       SELECT id
       FROM usuarios
       WHERE correo = ? 
    `,
      [correo]
    );
    if (existeCorreo.length > 0) {
      generaError("Ya existe un usuario con este correo.", 409);
    }

    const [existeAvatar] = await conexion.query(
      `
         SELECT id
         FROM usuarios
         WHERE avatar = ? 
      `,
      [avatar]
    );
    if (existeAvatar.length > 0) {
      generaError("Ya existe un usuario con este avatar.", 409);
    }

    const [nuevoUsuario] = await conexion.query(
      `
        INSERT INTO usuarios (avatar, correo, contrasena)
        VALUES (?, ?, SHA2(?, 512))
    `,
      [avatar, correo, contrasena]
    );

    return nuevoUsuario.insertId;
  } finally {
    if (conexion) conexion.release();
  }
};

const infoUsuarioBD = async (id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [infoUsuario] = await conexion.query(
      `
      SELECT id, correo, avatar, fecha_creacion
      FROM usuarios
      WHERE id = ?
    `,
      [id]
    );
    if (infoUsuario.length === 0) {
      generaError("No existe ningún usuario con esta id.", 404);
    }

    return infoUsuario[0];
  } finally {
    if (conexion) conexion.release();
  }
};

const loginBD = async (correo, contrasena) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [usuario] = await conexion.query(
      `
      SELECT id
      FROM usuarios
      WHERE correo = ? AND contrasena = SHA2(?, 512)
    `,
      [correo, contrasena]
    );

    if (usuario.length === 0) {
      generaError("Correo o contraseña incorrectos.", 401);
    }

    return usuario[0];
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = { nuevoUsuarioBD, infoUsuarioBD, loginBD };
