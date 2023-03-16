import { Link } from "react-router-dom";

function AutorizacionUsuario() {
  let usuario;
  let setUsuario;

  if (usuario) {
    return (
      <section>
        {usuario === "admin" ? <Link to="/admin">Admin</Link> : null}
        <section>
          <span>Avatar</span>
          <Link to="/usuario">
            <span>Usuario</span>
          </Link>
        </section>
        <span onClick={() => setUsuario(null)}>Salir</span>
      </section>
    );
  } else {
    return (
      <section className="registro">
        <Link to="/registro">Registrarse</Link>
        <Link to="/iniciosesion">Iniciar sesión</Link>
      </section>
    );
  }
}

export default AutorizacionUsuario;
