import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ValidarUsuario() {
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { codigoRegistro } = useParams();

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(
        `${process.env.REACT_APP_API}/usuarios/validar/${codigoRegistro}`
      );

      const datos = await respuesta.json();

      if (datos.estado === "error") {
        setEstado("error");
        setMensaje(datos.mensaje);
      } else {
        setEstado("ok");
        setMensaje(datos.mensaje);
      }
    })();
  }, [codigoRegistro]);

  return (
    <section>
      {estado === "error" && <p>{mensaje}</p>}
      {estado === "ok" && <p>{mensaje}</p>}
    </section>
  );
}

export default ValidarUsuario;
