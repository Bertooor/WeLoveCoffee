const { crearConexion } = require("./conexionBD");
const { generaError, generarCodigo } = require("../funcionesAyuda");

const nuevoUsuarioBD = async (avatar, correo, contrasena, codigoRegistro) => {
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
        INSERT INTO usuarios (avatar, correo, contrasena, codigoRegistro)
        VALUES (?, ?, SHA2(?, 512), ?)
    `,
      [avatar, correo, contrasena, codigoRegistro]
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
      SELECT id, correo, avatar, fecha_creacion, imagen
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
      SELECT id, usuarioActivo
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

const validarUsuarioBD = async (codigoRegistro) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [codigoValido] = await conexion.query(
      `
      SELECT id
      FROM usuarios
      WHERE codigoRegistro = ?
    `,
      [codigoRegistro]
    );

    if (codigoValido.length === 0) {
      generaError("Ningún usuario con este código de validación", 404);
    }

    await conexion.query(
      `
      UPDATE usuarios
      SET usuarioActivo = true, codigoRegistro = NULL
      WHERE codigoRegistro = ?
    `,
      [codigoRegistro]
    );

    return;
  } finally {
    if (conexion) conexion.release();
  }
};

const confirmarCorreoBD = async (correo) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [validarCorreo] = await conexion.query(
      `
      SELECT id
      FROM usuarios
      WHERE correo = ?
    `,
      [correo]
    );

    if (validarCorreo.length === 0) {
      generaError("No existe ningún usuario registrado con este correo", 404);
    }

    return;
  } finally {
    if (conexion) conexion.release();
  }
};

const existeCorreoBD = async (correo) => {
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

    if (existeCorreo > 0) {
      generaError("Ya existe un usuario con esta dirección de correo", 409);
    }
    return;
  } finally {
    if (conexion) conexion.release();
  }
};

const recuperaContrasenaBD = async (codigoRecuperacion, correo) => {
  let conexion;

  try {
    conexion = await crearConexion();

    await conexion.query(
      `
      UPDATE usuarios
      SET codigoRecuperacion = ?
      WHERE correo = ?
    `,
      [codigoRecuperacion, correo]
    );
    return;
  } finally {
    if (conexion) conexion.release();
  }
};

const nuevaContrasenaBD = async (codigoRecuperacion, nuevaContrasena) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [comprobarCodigo] = await conexion.query(
      `
      SELECT id
      FROM usuarios
      WHERE codigoRecuperacion = ?
    `,
      [codigoRecuperacion]
    );

    if (comprobarCodigo.length === 0) {
      generaError("Código de recuperación incorrecto.", 404);
    }

    await conexion.query(
      `
      UPDATE usuarios
      SET contrasena = SHA2(?, 512), codigoRecuperacion = NULL
      WHERE id = ?
    `,
      [nuevaContrasena, comprobarCodigo[0].id]
    );
  } finally {
    if (conexion) conexion.release();
  }
};

const existeAvatarBD = async (avatar) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [existeAvatar] = await conexion.query(
      `
      SELECT id
      FROM usuarios
      WHERE avatar = ?
    `,
      [avatar]
    );

    if (existeAvatar > 0) {
      generaError("Ya existe un usuario con este avatar", 409);
    }
  } finally {
    if (conexion) conexion.release();
  }
};

const editarUsuarioBD = async (correo, avatar, imagen, id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    await conexion.query(
      `
      UPDATE usuarios
      SET correo = ?, avatar = ?, imagen = ?
      WHERE id = ?
    `,
      [correo, avatar, imagen, id]
    );
  } finally {
    if (conexion) conexion.release();
  }
};

const borrarUsuarioBD = async (id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    await conexion.query(
      `
      DELETE 
      FROM usuarios
      WHERE id = ?
    `,
      [id]
    );
  } finally {
    if (conexion) conexion.release();
  }
};

const borrarImagenAvatarBD = async (id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    await conexion.query(
      `
      UPDATE usuarios
      SET imagen = NULL
      WHERE id = ?
    `,
      [id]
    );
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = {
  nuevoUsuarioBD,
  infoUsuarioBD,
  loginBD,
  validarUsuarioBD,
  confirmarCorreoBD,
  recuperaContrasenaBD,
  nuevaContrasenaBD,
  editarUsuarioBD,
  existeCorreoBD,
  existeAvatarBD,
  borrarUsuarioBD,
  borrarImagenAvatarBD,
};
