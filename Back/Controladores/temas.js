const { generaError, crearRuta, borrarImagen } = require("../funcionesAyuda");
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

const {
  nuevoTemaBD,
  listaTemasBD,
  borrarTemaBD,
  borrarListaComentariosBD,
  temaBD,
} = require("../BaseDatos/temasBD");

const { listaComentariosBD } = require("../BaseDatos/comentariosBD");

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

    if (!req.files?.imagen || !tema) {
      generaError("Falta añadir el tema o la imagen.", 400);
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

const borrarTema = async (req, res, next) => {
  try {
    const { tema_id } = req.params;

    const [tema] = await temaBD(tema_id);

    const imagenesComentarios = await listaComentariosBD(tema_id);
    console.log("imagenesComentarios: ", imagenesComentarios.imagen);

    if (imagenesComentarios) {
      for (const imagen of imagenesComentarios) {
        await borrarImagen(imagen.imagen);
      }
    }

    if (tema[0].imagen) {
      await borrarImagen(tema[0].imagen);
    }

    await borrarListaComentariosBD(tema_id);

    await borrarTemaBD(tema_id);

    res.send({
      estado: "ok",
      mensaje: `Tema con id: ${tema_id} y todos sus comentarios borrados.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listaTemas, nuevoTema, borrarTema };
