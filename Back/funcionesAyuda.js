const fs = require("fs/promises");
const path = require("path");

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

const borrarImagen = async (imagen) => {
  const rutaImagen = path.join(__dirname, "/archivos", imagen);

  await fs.unlink(rutaImagen);
};

module.exports = { generaError, crearRuta, borrarImagen };
