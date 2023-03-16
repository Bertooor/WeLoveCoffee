import { Link } from "react-router-dom";
import AutorizacionUsuario from "./AutorizacionUsuario";
import "./Cabecera.css";

function Cabecera() {
  return (
    <header className="header">
      <Link to="/temas">
        <img src="/logo192.png" alt="imagen logo" />
      </Link>
      <Link to="/temas">
        <h1>We Love Coffee</h1>
      </Link>
      <AutorizacionUsuario />
    </header>
  );
}

export default Cabecera;
