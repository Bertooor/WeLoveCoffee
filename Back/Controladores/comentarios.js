const {
  nuevoComentarioBD,
  listaComentariosBD,
  comentarioBD,
  borrarComentarioBD,
} = require("../BaseDatos/comentariosBD");
const { crearRuta, generaError, borrarImagen } = require("../funcionesAyuda");
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
      req.autorizacion,
      tema_id,
      texto,
      nombreArchivo
    );

    res.send({
      estado: "ok",
      mensaje: `Nuevo comentario con id: ${id}.`,
    });
  } catch (error) {
    next(error);
  }
};

const borrarComentario = async (req, res, next) => {
  try {
    const { comentario_id } = req.params;

    const comentario = await comentarioBD(comentario_id);

    if (req.autorizacion !== comentario.usuario_id && req.autorizacion !== 1) {
      generaError("No puedes borrar un comentario de otro usuario.", 401);
    }

    if (comentario.imagen) {
      await borrarImagen(comentario.imagen);
    }

    await borrarComentarioBD(comentario_id);

    res.send({
      estado: "ok",
      mensaje: `Comentario con id: ${comentario_id} borrado.`,
    });
  } catch (error) {
    next(error);
  }
};

const listaComentarios = async (req, res, next) => {
  try {
    const { tema_id } = req.params;

    const comentarios = await listaComentariosBD(tema_id);
    res.send({
      estado: "ok",
      mensaje: "Listado de comentarios.",
      datos: comentarios,
    });
  } catch (error) {
    next(error);
  }
};

const verComentario = async (req, res, next) => {
  try {
    const { comentario_id } = req.params;

    const comentario = await comentarioBD(comentario_id);

    res.send({
      estado: "ok",
      mensaje: `Comentario con id: ${comentario_id}.`,
      datos: comentario,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  nuevoComentario,
  borrarComentario,
  listaComentarios,
  verComentario,
};
