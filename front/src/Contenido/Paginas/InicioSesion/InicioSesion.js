import { useState } from "react";
import { useUsuario, useSetUsuario } from "../../../UsuarioContext";
import { Link, Navigate } from "react-router-dom";

function InicioSesion() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const usuario = useUsuario();
  const setUsuario = useSetUsuario();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/usuarios/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      }
    );

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setUsuario(datos);
      setEstado("ok");
      setMensaje(datos.mensaje);
    }
  };

  if (usuario) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Correo electrónico</span>
          <input
            name="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>
        <label>
          <span>Contraseña</span>
          <input
            name="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </label>
        <button>Iniciar sesión</button>
        {estado === "error" && <p>{mensaje}</p>}
        <p>¿No recuerdas tu contraseña?</p>
        <p>
          <Link to="/nuevaContrasena">Nueva contraseña</Link>
        </p>
        <p>Si aún no tienes cuenta en We Love Coffee...</p>
        <p>
          <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </section>
  );
}

export default InicioSesion;
