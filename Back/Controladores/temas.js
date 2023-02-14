const listaTemas = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "Listado de temas.",
    });
  } catch (error) {
    next(error);
  }
};

const infoTema = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "Información sobre un tema.",
    });
  } catch (error) {
    next(error);
  }
};

const nuevoTema = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "Nuevo tema creado.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listaTemas, infoTema, nuevoTema };
