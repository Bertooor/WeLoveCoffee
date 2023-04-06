import { Link } from "react-router-dom";
import { useUsuario, useSetUsuario } from "../UsuarioContext";

function AutorizacionUsuario() {
  const usuario = useUsuario();
  const setUsuario = useSetUsuario();

  if (usuario) {
    return (
      <section className="conautorizacion">
        {usuario.usuario.rol === "admin" ? (
          <Link to="/admin">Admin</Link>
        ) : null}
        <section className="imagenusuario">
          {!usuario.usuario.imagen ? (
            <img
              src="/avatar-removebg-preview.png"
              alt="imagen avatar por defecto"
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_API}/archivos/${usuario.usuario.imagen}`}
              alt="imagen usuario"
            />
          )}
          <Link to="/usuario">
            <span>{usuario.usuario.avatar}</span>
          </Link>
        </section>
        <img
          src="/logoutcafe.png"
          alt="cerrar sesión"
          className="logout"
          onClick={() => setUsuario(null)}
        />
      </section>
    );
  } else {
    return (
      <section className="sinautorizacion">
        <Link to="/registro">Registrarse</Link>
        <Link to="/iniciosesion">Iniciar sesión</Link>
      </section>
    );
  }
}

export default AutorizacionUsuario;
