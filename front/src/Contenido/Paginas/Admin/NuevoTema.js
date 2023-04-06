import { useState } from "react";
import { useUsuario } from "../../../UsuarioContext";

function NuevoTema() {
  const usuario = useUsuario();

  const [tema, setTema] = useState("");
  const [imagen, setImagen] = useState();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("tema", tema);
    formData.append("imagen", imagen);

    const respuesta = await fetch(`${process.env.REACT_APP_API}/`, {
      method: "POST",
      headers: {
        Authorization: usuario?.datos,
      },
      body: formData,
    });

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setMensaje(datos.mensaje);
      setTema("");
      setImagen();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Nuevo tema:</h3>
      <label>
        <span>Tema:</span>
        <input
          name="tema"
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />
      </label>
      <label>
        <span>Imagen:</span>
        <input
          type="file"
          name="imagen"
          onChange={(e) => setImagen(e.target.files[0])}
        />
      </label>
      <button>Enviar</button>
      {estado === "error" && <p className="error">{mensaje}</p>}
      {estado === "ok" && <p>{mensaje}</p>}
    </form>
  );
}

export default NuevoTema;
