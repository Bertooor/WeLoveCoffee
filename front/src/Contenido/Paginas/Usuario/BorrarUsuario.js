import { useState } from "react";
import { useSetUsuario, useUsuario } from "../../../Funciones/UsuarioContext";

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
      setUsuario(null);
    }
  };
  return (
    <>
      <button onClick={handleDelete} className="borrarUsuario">
        Eliminar usuario
      </button>
      {estado === "error" && <p className="error">{mensaje}</p>}
    </>
  );
}

export default BorrarUsuario;
