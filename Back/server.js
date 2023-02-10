require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { PORT } = process.env;

const {
  nuevoUsuario,
  infoUsuario,
  login,
} = require("./Controladores/usuarios");

const { listaTemas, infoTema, nuevoTema } = require("./Controladores/temas");

const {
  nuevoComentario,
  borrarComentario,
} = require("./Controladores/comentarios");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/usuarios/:id", nuevoUsuario);
app.post("usuarios", infoUsuario);
app.post("usuarios/login", login);

app.get("/", listaTemas);
app.get("/:idTema", infoTema);
app.post("/", nuevoTema);

app.post("/:idTema/comentario", nuevoComentario);
app.delete("/:idTema/comentario", borrarComentario);

app.use((req, res) => {
  res.status(404).send({
    estado: "error",
    mensage: "Elemento no encontrado.",
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    estado: "error",
    mensage: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
