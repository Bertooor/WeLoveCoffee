const jwt = require("jsonwebtoken");
const { generaError } = require("../funcionesAyuda");

const autorizacionUsuario = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generaError("Falta la cabecera de autorización.", 401);
    }

    let token;

    try {
      token = jwt.verify(authorization, process.env.JWT_SECRETO);
    } catch {
      generaError("Token incorrecto.", 401);
    }

    // Creo propiedad con los datos del token
    req.autorizacion = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = autorizacionUsuario;
