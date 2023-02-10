const nuevoComentario = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

const borrarComentario = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { nuevoComentario, borrarComentario };
