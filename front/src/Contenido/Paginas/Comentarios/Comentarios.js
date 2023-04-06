import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../../UsuarioContext";
import BorrarComentario from "./BorrarComentario";
import "./Comentarios.css";
import NuevoComentario from "./NuevoComentario";

function Comentarios({ temas }) {
  const { id } = useParams();

  const usuario = useUsuario();

  const [comentarios, setComentarios] = useState();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [llave, setLlave] = useState(0);
  const recarga = () => setLlave((k) => k + 1);

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const tema = temas?.datos.filter((elemento) => {
    return elemento.id === +id;
  })[0].tema;

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(
        `${process.env.REACT_APP_API}/${id}/comentario`,
        {
          headers: {
            Authorization: usuario?.datos,
          },
        }
      );
      const datos = await respuesta.json();
      console.log("datos: ", datos);

      if (datos.estado === "error") {
        setEstado("error");
        setMensaje(datos.mensaje);
      } else {
        setEstado("ok");
        setComentarios(datos);
      }
    })();
  }, [id, usuario?.datos, llave]);

  if (usuario) {
    return (
      <section className="comentarios">
        <h3>{tema}</h3>
        <ul>
          {comentarios &&
            comentarios.datos?.map((comentario) => (
              <li key={comentario.id}>
                {comentario.imagen && (
                  <img
                    src={`${process.env.REACT_APP_API}/archivos/${comentario.imagen}`}
                    alt="imagen comentario"
                  />
                )}
                <p ref={ref}>{comentario.texto}</p>
                {comentario.usuario_id === usuario.usuario.id ||
                usuario.usuario.id === 1 ? (
                  <BorrarComentario
                    comentario_id={comentario.id}
                    recarga={recarga}
                  />
                ) : null}
              </li>
            ))}
        </ul>
        <NuevoComentario recarga={recarga} funcion={handleClick} />
        {estado === "error" && <p className="error">{mensaje}</p>}
      </section>
    );
  } else {
    return (
      <section>
        <h2 className="error">
          No tienes acceso a esta sección, debes estar logueado.
        </h2>
      </section>
    );
  }
}

export default Comentarios;
