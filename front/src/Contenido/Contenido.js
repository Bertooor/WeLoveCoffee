import { Routes, Route } from "react-router-dom";
import Temas from "./Paginas/Temas/Temas";
import Registro from "./Paginas/Registro/Registro";
import InicioSesion from "./Paginas/InicioSesion/InicioSesion";
import Usuario from "./Paginas/Usuario/Usuario";
import Admin from "./Paginas/Admin/Admin";
import "./Contenido.css";

function Contenido() {
  return (
    <main>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/usuario/*" element={<Usuario />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/temas" element={<Temas />} />
      </Routes>
    </main>
  );
}

export default Contenido;
