require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { PORT } = process.env;

const {
  nuevoUsuario,
  infoUsuario,
  login,
  validarUsuario,
  recuperaContrasena,
  nuevaContrasena,
  editarUsuario,
} = require("./Controladores/usuarios");

const { listaTemas, nuevoTema, borrarTema } = require("./Controladores/temas");

const {
  nuevoComentario,
  borrarComentario,
  listaComentarios,
  verComentario,
} = require("./Controladores/comentarios");

const { autorizacionUsuario, esAdmin } = require("./Middlewares/autorizacion");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
// Para poder utilizar los recursos estáticos
app.use(`/archivos`, express.static("./archivos"));

app.get("/usuarios/:id", autorizacionUsuario, infoUsuario);
app.get("/usuarios/validar/:codigoRegistro", validarUsuario);
app.post("/usuarios", nuevoUsuario);
app.post("/usuarios/login", login);
app.post("/usuarios/recuperaContrasena", recuperaContrasena);
app.post("/usuarios/nuevaContrasena", nuevaContrasena);
app.put("/usuarios/:id", autorizacionUsuario, editarUsuario);

app.get("/", listaTemas);
app.post("/", autorizacionUsuario, esAdmin, nuevoTema);
app.delete("/:tema_id", autorizacionUsuario, esAdmin, borrarTema);

app.get("/comentario/:comentario_id", autorizacionUsuario, verComentario);
app.get("/:tema_id/comentario", autorizacionUsuario, listaComentarios);
app.post("/:tema_id/comentario", autorizacionUsuario, nuevoComentario);
app.delete("/comentario/:comentario_id", autorizacionUsuario, borrarComentario);

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
