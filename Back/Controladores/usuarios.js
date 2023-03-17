const jwt = require("jsonwebtoken");
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

const {
  generaError,
  enviarCorreo,
  generarCodigo,
  crearRuta,
  borrarImagen,
} = require("../funcionesAyuda");
const {
  nuevoUsuarioBD,
  infoUsuarioBD,
  loginBD,
  validarUsuarioBD,
  nuevaContrasenaBD,
  recuperaContrasenaBD,
  confirmarCorreoBD,
  editarUsuarioBD,
  existeCorreoBD,
  existeAvatarBD,
  borrarUsuarioBD,
  borrarImagenAvatarBD,
} = require("../BaseDatos/usuariosBD");

const nuevoUsuario = async (req, res, next) => {
  try {
    const { avatar, correo, contrasena } = req.body;

    if (!avatar || !correo || !contrasena) {
      generaError("Información de registro incompleta.", 400);
    }

    const codigoRegistro = generarCodigo(40);

    const usuarioId = await nuevoUsuarioBD(
      avatar,
      correo,
      contrasena,
      codigoRegistro
    );

    const correoValidacion = `
      Acabas de registrarte en WeLoveCoffee.
      Pulsa en este enlace para validar tu cuenta: ${process.env.PUBLIC_HOST}/usuarios/validar/${codigoRegistro}
    `;

    enviarCorreo({
      to: correo,
      subject: "Correo de activación de usuario.",
      body: correoValidacion,
    });

    res.send({
      estado: "ok",
      mensaje: `Nuevo usuario creado con id: ${usuarioId}.
      Comprueba tu correo para validar tus datos.`,
    });
  } catch (error) {
    next(error);
  }
};

const infoUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await infoUsuarioBD(id);

    if (req.autorizacion !== usuario.id && req.autorizacion !== 1) {
      generaError(
        "Lo siento no tienes permiso para acceder a esta información.",
        403
      );
    }

    res.send({
      estado: "ok",
      mensaje: "Información usuario.",
      datos: usuario,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      generaError("Debes enviar un correo y una contraseña", 400);
    }

    const usuario = await loginBD(correo, contrasena);

    if (!usuario.usuarioActivo) {
      generaError("Usuario pendiente de validación, revise su correo", 401);
    }

    const token = jwt.sign(usuario, process.env.JWT_SECRETO, {
      expiresIn: "1d",
    });
    res.send({
      estado: "ok",
      mensaje: "Usuario logeado.",
      datos: token,
      usuario,
    });
  } catch (error) {
    next(error);
  }
};

const validarUsuario = async (req, res, next) => {
  try {
    const { codigoRegistro } = req.params;

    await validarUsuarioBD(codigoRegistro);
    res.send({
      estado: "ok",
      mensaje: "Usuario validado.",
    });
  } catch (error) {
    next(error);
  }
};

const recuperaContrasena = async (req, res, next) => {
  try {
    const { correo } = req.body;

    if (!correo) {
      generaError("Escribe tu dirección de correo, por favor.", 400);
    }

    await confirmarCorreoBD(correo);

    const codigoRecuperacion = generarCodigo(40);

    const cuerpoCorreo = `
    Se solicitó un cambio de contraseña para el usuario registrado con este email en We Love Coffee.

    El código de recuperación es: ${codigoRecuperacion}.

    Si no fuiste tu el que solicitó el cambio, ignora este correo y sigue con tu contraseña habitual.

    ¡ Gracias !
    `;

    await enviarCorreo({
      to: correo,
      subject: `Cambio de contraseña en We Love Coffee.`,
      body: cuerpoCorreo,
    });

    await recuperaContrasenaBD(codigoRecuperacion, correo);

    res.send({
      estado: "ok",
      mensaje: "Revisa tu correo para cambiar tu contraseña.",
    });
  } catch (error) {
    next(error);
  }
};

const nuevaContrasena = async (req, res, next) => {
  try {
    const { codigoRecuperacion, nuevaContrasena } = req.body;

    if (!codigoRecuperacion || !nuevaContrasena) {
      generaError("Faltan campos por completar.", 400);
    }

    await nuevaContrasenaBD(codigoRecuperacion, nuevaContrasena);

    res.send({
      estado: "ok",
      mensaje: "Contraseña modificada con éxito.",
    });
  } catch (error) {
    next(error);
  }
};

const editarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await infoUsuarioBD(id);

    if (req.autorizacion !== usuario.id && req.autorizacion !== 1) {
      generaError(
        "Lo siento no tienes permiso para acceder a esta información.",
        403
      );
    }

    const { correo, avatar } = req.body;

    if (correo !== usuario.correo) {
      await existeCorreoBD(correo);
    }

    if (avatar !== usuario.avatar) {
      await existeAvatarBD(avatar);
    }

    if (usuario.imagen?.length > 0) {
      generaError("Lo siento solo puedes tener una imagen como avatar.");
    }

    let nombreArchivo;
    if (req.files && req.files.imagen) {
      const rutaDirectorioArchivos = path.join(__dirname, "../archivos");

      await crearRuta(rutaDirectorioArchivos);

      console.log(req.files.imagen);

      const archivo = sharp(req.files.imagen.data);

      nombreArchivo = `${uuid.v4()}_${req.files.imagen.name}`;

      await archivo.toFile(path.join(rutaDirectorioArchivos, nombreArchivo));
    }

    await editarUsuarioBD(correo, avatar, nombreArchivo, id);

    res.send({
      estado: "ok",
      mensaje: "Datos de usuario actualizados.",
    });
  } catch (error) {
    next(error);
  }
};

const borrarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await infoUsuarioBD(id);

    if (usuario.id === 1) {
      generaError("El administrador no se puede eliminar.", 403);
    }

    if (req.autorizacion !== usuario.id && req.autorizacion !== 1) {
      generaError(
        "Lo siento no tienes permiso para acceder a esta información.",
        403
      );
    }

    if (usuario.imagen && usuario.imagen.length > 0) {
      await borrarImagen(usuario.imagen);
    }

    await borrarUsuarioBD(id);

    res.send({
      estado: "ok",
      mensaje: `Usuario con id ${id} eliminado de la base de datos.`,
    });
  } catch (error) {
    next(error);
  }
};

const borrarImagenAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await infoUsuarioBD(id);

    if (req.autorizacion !== usuario.id && req.autorizacion !== 1) {
      generaError(
        "Lo siento no tienes permiso para acceder a esta información.",
        403
      );
    }

    if (usuario.imagen && usuario.imagen.length > 0) {
      await borrarImagen(usuario.imagen);
    }

    await borrarImagenAvatarBD(id);

    res.send({
      estado: "ok",
      mensaje: "Imagen usuario eliminada.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  nuevoUsuario,
  infoUsuario,
  login,
  validarUsuario,
  recuperaContrasena,
  nuevaContrasena,
  editarUsuario,
  borrarUsuario,
  borrarImagenAvatar,
};
