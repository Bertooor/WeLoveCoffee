const jwt = require("jsonwebtoken");
const { generaError } = require("../funcionesAyuda");

const autorizacionUsuario = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generaError(
        "Lo siento no tienes permisos para este tipo de acción. Inicia sesión.",
        401
      );
    }

    let token;

    try {
      token = jwt.verify(authorization, process.env.JWT_SECRETO);
    } catch {
      generaError("Autorización incorrecta o caducada.", 401);
    }

    // Creo propiedad con los datos del token
    req.autorizacion = token.id;

    next();
  } catch (error) {
    next(error);
  }
};

const esAdmin = (req, res, next) => {
  try {
    if (req.autorizacion !== 1) {
      generaError(
        "Lo siento no tienes permisos para este tipo de acción.",
        401
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { autorizacionUsuario, esAdmin };
