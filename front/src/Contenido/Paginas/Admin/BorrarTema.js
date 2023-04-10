import { useState } from "react";
import { useUsuario } from "../../../Funciones/UsuarioContext";

function BorrarTema({ tema, recarga }) {
  const usuario = useUsuario();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleDelete = async () => {
    const respuesta = await fetch(`${process.env.REACT_APP_API}/${tema}`, {
      method: "DELETE",
      headers: {
        Authorization: usuario?.datos,
      },
    });

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      recarga();
    }
  };
  return (
    <>
      <button onClick={handleDelete}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
      {estado === "error" && <p className="error">{mensaje}</p>}
    </>
  );
}

export default BorrarTema;
