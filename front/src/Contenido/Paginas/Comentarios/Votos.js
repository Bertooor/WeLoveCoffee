import { useEffect, useState } from "react";
import { useUsuario } from "../../../Funciones/UsuarioContext";

function Votos({ id }) {
  const usuario = useUsuario();

  const [votosPos, setVotosPos] = useState();
  const [votosNeg, setVotosNeg] = useState();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado que me ayuda a recargar el contenido cada vez que lo modifico.
  const [llave, setLlave] = useState(0);
  const recarga = () => setLlave((k) => k + 1);

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(
        `${process.env.REACT_APP_API}/comentario/${id}/votos`,
        {
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
        setVotosPos(datos.datos.votosPositivos);
        setVotosNeg(datos.datos.votosNegativos);
      }
    })();
  }, [id, usuario?.datos, llave]);

  const handleClickPos = async () => {
    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/comentario/${id}/megusta`,
      {
        method: "POST",
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
      recarga();
    }
  };

  const handleClickNeg = async () => {
    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/comentario/${id}/nomegusta`,
      {
        method: "POST",
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
      recarga();
    }
  };
  return (
    <section className="votos">
      <label className="positivo">
        <span>{votosPos}</span>
        <i className="fa-solid fa-thumbs-up" onClick={handleClickPos}></i>
      </label>
      <label className="negativo">
        <span>{votosNeg}</span>
        <i className="fa-solid fa-thumbs-down" onClick={handleClickNeg}></i>
      </label>
      {estado === "error" && <p className="error">{mensaje}</p>}
    </section>
  );
}

export default Votos;
