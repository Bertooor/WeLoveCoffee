import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../../Funciones/UsuarioContext";
import BorrarComentario from "./BorrarComentario";
import "./Comentarios.css";
import NuevoComentario from "./NuevoComentario";
import { fechaPersonalizada } from "../../../Funciones/fechaPersonalizada";
import Spinner from "../../../Funciones/Spinner/Spinner";

function Comentarios({ temas }) {
  const { id } = useParams();

  const usuario = useUsuario();

  const [comentarios, setComentarios] = useState();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Estado que me ayuda a recargar el contenido cada vez que lo modifico.
  const [llave, setLlave] = useState(0);
  const recarga = () => setLlave((k) => k + 1);

  // Función que hace scroll a una referencia creada en cualquier zona de la página.
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const tema = temas?.datos.filter((elemento) => {
    return elemento.id === +id;
  })[0].tema;

  useEffect(() => {
    (async () => {
      setCargando(true);
      const respuesta = await fetch(
        `${process.env.REACT_APP_API}/${id}/comentario`,
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
        setCargando(false);
      } else {
        setEstado("ok");
        setComentarios(datos);
        setCargando(false);
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
                <h3 className="usuarioAvatar">
                  {comentario.avatar}
                  <span>{fechaPersonalizada(comentario.fecha_creacion)}</span>
                </h3>
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
        {cargando && <Spinner />}
        {estado === "error" && <p className="error">{mensaje}</p>}
      </section>
    );
  } else {
    return (
      <section className="comentarios">
        <h2 className="error">
          No tienes acceso a esta sección, debes estar logueado.
        </h2>
      </section>
    );
  }
}

export default Comentarios;
