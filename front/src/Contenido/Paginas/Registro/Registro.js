import { useState } from "react";

function Registro() {
  const [avatar, setAvatar] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const respuesta = await fetch(`${process.env.REACT_APP_API}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar,
        correo,
        contrasena,
      }),
    });

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setMensaje(datos.mensaje);
    }
  };
  return (
    <section>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Avatar</span>
          <input
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
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
        <button>Registrarse</button>
        {estado === "error" && <p>{mensaje}</p>}
        {estado === "ok" && <p>{mensaje}</p>}
      </form>
    </section>
  );
}

export default Registro;
