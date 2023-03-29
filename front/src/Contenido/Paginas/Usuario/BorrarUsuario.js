import { useState } from "react";
import { useSetUsuario, useUsuario } from "../../../UsuarioContext";

function BorrarUsuario() {
  const usuario = useUsuario();
  const setUsuario = useSetUsuario();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleDelete = async () => {
    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/usuarios/${usuario.usuario?.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: usuario?.datos,
        },
      }
    );

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setMensaje(datos.mensaje);
      setUsuario(null);
    }
  };
  return (
    <>
      <button onClick={handleDelete}>Borrar usuario</button>
      {estado === "error" && <p>{mensaje}</p>}
    </>
  );
}

export default BorrarUsuario;
