const { generaError, crearRuta } = require("../funcionesAyuda");
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

const { nuevoTemaBD, listaTemasBD } = require("../BaseDatos/temasBD");

const listaTemas = async (req, res, next) => {
  try {
    const temas = await listaTemasBD();
    res.send({
      estado: "ok",
      mensaje: "Listado de temas.",
      datos: temas,
    });
  } catch (error) {
    next(error);
  }
};

const nuevoTema = async (req, res, next) => {
  try {
    const { tema } = req.body;

    if (!tema) {
      generaError("Falta añadir el tema.", 400);
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

    const id = await nuevoTemaBD(tema, nombreArchivo);

    res.send({
      estado: "ok",
      mensaje: `Nuevo tema con id: ${id}.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listaTemas, nuevoTema };
