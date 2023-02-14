const nuevoComentarioBD = require("../BaseDatos/comentariosBD");
const { crearRuta, generaError } = require("../funcionesAyuda");
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

const nuevoComentario = async (req, res, next) => {
  try {
    const { tema_id } = req.params;
    const { texto } = req.body;

    if (!texto || texto.length > 500) {
      generaError(
        "Debe existir el comentario sin exceder de 500 caracteres.",
        400
      );
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

    const id = await nuevoComentarioBD(
      req.autorizacion.id,
      tema_id,
      texto,
      nombreArchivo
    );

    res.send({
      estado: "ok",
      mensaje: `Nuevo comentario con id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const borrarComentario = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "Comentario borrado.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { nuevoComentario, borrarComentario };
