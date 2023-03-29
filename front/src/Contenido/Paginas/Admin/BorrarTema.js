import { useState } from "react";
import { useUsuario } from "../../../UsuarioContext";

function BorrarTema({ tema }) {
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
    console.log("datos: ", datos);

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setMensaje(datos.mensaje);
    }
  };
  return (
    <>
      <button onClick={handleDelete}>Borrar tema</button>
      {estado === "error" && <p>{mensaje}</p>}
    </>
  );
}

export default BorrarTema;
