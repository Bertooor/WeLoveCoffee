import { useState } from "react";
import { Link } from "react-router-dom";

function NuevaContrasena() {
  const [correo, setCorreo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [codigoRecuperacion, setCodigoRecuperacion] = useState("");
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado2, setEstado2] = useState("");
  const [mensaje2, setMensaje2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/usuarios/recuperaContrasena`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo,
        }),
      }
    );

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setMensaje(datos.mensaje);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/usuario/nuevaContrasena`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigoRecuperacion,
          nuevaContrasena,
        }),
      }
    );

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado2("error");
      setMensaje2(datos.mensaje);
    } else {
      setEstado2("ok");
      setMensaje2(datos.mensaje);
    }
  };

  return (
    <section>
      <h2>NuevaContraseña</h2>
      <form onSubmit={handleSubmit} className="form">
        <p>
          Envía tu correo electrónico y te devolveremos un código con el que
          podrás obtener una nueva.
        </p>
        <label>
          <span>Correo electrónico</span>
          <input
            name="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>
        <button>Enviar correo</button>
        {estado === "error" && <p>{mensaje}</p>}
        {estado === "ok" && <p>{mensaje}</p>}
      </form>
      <form onSubmit={handleSubmit2} className="form">
        <label>
          <span>Código de recuperación</span>
          <input
            name="codigoRecuperacion"
            value={codigoRecuperacion}
            onChange={(e) => setCodigoRecuperacion(e.target.value)}
          />
        </label>
        <label>
          <span>Nueva contraseña</span>
          <input
            name="nuevaContrasena"
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
          />
        </label>
        <button>Enviar contraseña</button>
        {estado2 === "error" && <p>{mensaje2}</p>}
        {estado2 === "ok" && <p>{mensaje2}</p>}

        <p>Si has completado ambos pasos...</p>
        <p>
          <Link to="/iniciosesion">Inicia sesión</Link>
        </p>
      </form>
    </section>
  );
}

export default NuevaContrasena;
