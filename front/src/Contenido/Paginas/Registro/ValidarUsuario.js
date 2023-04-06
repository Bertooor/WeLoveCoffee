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
      {estado === "error" && <h2 className="error">{mensaje}</h2>}
      {estado === "ok" && <h2>{mensaje}</h2>}
    </section>
  );
}

export default ValidarUsuario;
