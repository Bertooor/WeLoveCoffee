const listaTemas = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

const infoTema = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

const nuevoTema = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listaTemas, infoTema, nuevoTema };
