import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../../UsuarioContext";

function NuevoComentario({ recarga }) {
  const usuario = useUsuario();

  const { id } = useParams();

  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("texto", texto);
    formData.append("imagen", imagen);

    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/${id}/comentario`,
      {
        method: "POST",
        headers: {
          Authorization: usuario?.datos,
        },
        body: formData,
      }
    );

    const datos = await respuesta.json();
    console.log("datosNC:", datos);

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setMensaje(datos.mensaje);
      setTexto("");
      recarga();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Comentario:</span>
        <textarea
          rows="20"
          cols="100"
          required
          name="texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>
      <label>
        <span>Imagen:</span>
        <input
          className="image-picker"
          type="file"
          name="imagen"
          onChange={(e) => setImagen(e.target.files[0])}
        />
        {/* {imagePreview && <img src={imagePreview} alt="imagen" />} */}
      </label>
      <button>Enviar</button>
      {estado === "error" && <p className="api">{mensaje}</p>}
      {estado === "ok" && <p className="api">{mensaje}</p>}
    </form>
  );
}

export default NuevoComentario;
