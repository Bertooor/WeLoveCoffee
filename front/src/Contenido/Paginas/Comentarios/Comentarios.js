import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../../UsuarioContext";
import BorrarComentario from "./BorrarComentario";
import "./Comentarios.css";
import NuevoComentario from "./NuevoComentario";

function Comentarios() {
  const { id } = useParams();

  console.log("tema_id: ", id);

  const usuario = useUsuario();

  const [comentarios, setComentarios] = useState();

  const [llave, setLlave] = useState(0);
  const recarga = () => setLlave((k) => k + 1);

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

      setComentarios(datos);
      console.log("k", datos);
    })();
  }, [id, usuario?.datos, llave]);

  if (usuario) {
    return (
      <section className="comentarios">
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
                <p>{comentario.texto}</p>
                {comentario.usuario_id === usuario.usuario.id ||
                usuario.usuario.id === 1 ? (
                  <BorrarComentario
                    comentario_id={comentario.id}
                    recarga={recarga}
                  />
                ) : null}
                <hr />
              </li>
            ))}
        </ul>
        <NuevoComentario recarga={recarga} />
      </section>
    );
  } else {
    return (
      <section>
        <h2>No tienes acceso a esta sección, debes estar logueado.</h2>
      </section>
    );
  }
}

export default Comentarios;
