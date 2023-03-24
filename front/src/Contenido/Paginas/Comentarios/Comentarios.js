import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../../UsuarioContext";
import "./Comentarios.css";

function Comentarios() {
  const { id } = useParams();

  console.log("tema_id: ", id);

  const usuario = useUsuario();

  const [comentarios, setComentarios] = useState();

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(
        `${process.env.REACT_APP_API}/${id}/comentario`,
        {
          headers: {
            Authorization: usuario.datos,
          },
        }
      );
      const datos = await respuesta.json();

      setComentarios(datos);
      console.log("k", datos);
    })();
  }, [id, usuario.datos]);

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
              <hr />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Comentarios;
