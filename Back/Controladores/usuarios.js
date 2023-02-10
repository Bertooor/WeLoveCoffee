const nuevoUsuario = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

const infoUsuario = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    res.send({
      estado: "error",
      mensaje: "",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { nuevoUsuario, infoUsuario, login };
