const jwt = require("jsonwebtoken");

const { generaError } = require("../funcionesAyuda");
const {
  nuevoUsuarioBD,
  infoUsuarioBD,
  loginBD,
} = require("../BaseDatos/usuariosBD");

const nuevoUsuario = async (req, res, next) => {
  try {
    const { avatar, correo, contrasena } = req.body;

    if (!avatar || !correo || !contrasena) {
      generaError("Información de registro incompleta.", 400);
    }

    const usuarioId = await nuevoUsuarioBD(avatar, correo, contrasena);

    res.send({
      estado: "ok",
      mensaje: `Nuevo usuario creado con id: ${usuarioId}`,
    });
  } catch (error) {
    next(error);
  }
};

const infoUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await infoUsuarioBD(id);

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
      gereraError("Debes enviar un correo y una contraseña", 400);
    }

    const usuario = await loginBD(correo, contrasena);

    const token = jwt.sign(usuario, process.env.JWT_SECRETO, {
      expiresIn: "1d",
    });
    res.send({
      estado: "ok",
      mensaje: "Usuario logeado.",
      datos: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { nuevoUsuario, infoUsuario, login };
