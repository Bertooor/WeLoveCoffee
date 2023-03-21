import { Routes, Route } from "react-router-dom";
import Temas from "./Paginas/Temas/Temas";
import Registro from "./Paginas/Registro/Registro";
import InicioSesion from "./Paginas/InicioSesion/InicioSesion";
import Usuario from "./Paginas/Usuario/Usuario";
import Admin from "./Paginas/Admin/Admin";
import "./Contenido.css";
import ValidarUsuario from "./Paginas/Registro/ValidarUsuario";
import NuevaContrasena from "./Paginas/InicioSesion/NuevaContrasena";

function Contenido() {
  return (
    <main>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/usuarios/validar/:codigoRegistro"
          element={<ValidarUsuario />}
        />
        <Route path="/nuevaContrasena" element={<NuevaContrasena />} />
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/" element={<Temas />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </main>
  );
}

export default Contenido;
