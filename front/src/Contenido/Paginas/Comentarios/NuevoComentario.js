import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../../UsuarioContext";

function NuevoComentario({ recarga, funcion }) {
  const usuario = useUsuario();

  const { id } = useParams();

  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState();
  const [previsualizarImagen, setPrevisualizarImagen] = useState();

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

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setTexto("");
      setImagen();
      recarga();
      setPrevisualizarImagen();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            rows="1"
            cols="100"
            maxLength="500"
            required
            name="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe..."
          />
        </label>
        {previsualizarImagen && (
          <img
            src={URL.createObjectURL(previsualizarImagen)}
            alt="imagen"
            className="preview"
          />
        )}
        <label>
          <span className="botonImagen">
            <i className="fa-solid fa-camera"></i>
          </span>
          <input
            className="imagenPrevia"
            type="file"
            name="imagen"
            onChange={(e) => {
              setImagen(e.target.files[0]);
              setPrevisualizarImagen(e.target.files[0]);
            }}
          />
        </label>
        <button onClick={funcion}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
        {estado === "error" && <p className="error">{mensaje}</p>}
      </form>
    </>
  );
}

export default NuevoComentario;
