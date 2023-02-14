const fs = require("fs/promises");

const generaError = (mensaje, estado) => {
  const error = new Error(mensaje);
  error.httpStatus = estado;
  throw error;
};

const crearRuta = async (ruta) => {
  try {
    await fs.access(ruta);
  } catch {
    await fs.mkdir(ruta);
  }
};

module.exports = { generaError, crearRuta };
