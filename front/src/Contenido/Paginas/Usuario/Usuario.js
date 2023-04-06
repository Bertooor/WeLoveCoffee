import { useEffect, useState } from "react";
import { useUsuario } from "../../../UsuarioContext";
import BorrarUsuario from "./BorrarUsuario";

function Usuario() {
  const usuario = useUsuario();

  const [avatar, setAvatar] = useState("");
  const [correo, setCorreo] = useState("");
  const [imagen, setImagen] = useState();
  const [previsualizarImagen, setPrevisualizarImagen] = useState();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [estado2, setEstado2] = useState("");
  const [mensaje2, setMensaje2] = useState("");

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(
        `
        ${process.env.REACT_APP_API}/usuarios/${usuario?.usuario.id}
      `,
        {
          headers: {
            Authorization: usuario?.datos,
          },
        }
      );

      const datos = await respuesta.json();

      if (datos.estado === "error") {
        setEstado2("error");
        setMensaje2(datos.mensaje);
      } else {
        setEstado2("ok");
        setAvatar(datos.datos.avatar);
        setCorreo(datos.datos.correo);
        setImagen(datos.datos.imagen);
      }
    })();
  }, [usuario?.usuario.id, usuario?.datos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("correo", correo);
    formData.append("imagen", imagen);

    const respuesta = await fetch(
      `${process.env.REACT_APP_API}/usuarios/${usuario.usuario.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: usuario?.datos,
        },
        body: formData,
      }
    );

    const datos = await respuesta.json();

    if (datos.estado === "error") {
      setEstado("error");
      setMensaje(datos.mensaje);
    } else {
      setEstado("ok");
      setMensaje(datos.mensaje);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];

    setImagen(file);
    setPrevisualizarImagen(URL.createObjectURL(file));
  };

  if (usuario) {
    return (
      <section>
        <h2>Perfil usuario</h2>
        {estado2 === "error" && <p className="error">{mensaje2}</p>}
        <form onSubmit={handleSubmit} className="form">
          <label>
            <span>Avatar:</span>
            <input
              name="avatar"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>
          <label>
            <span>Correo:</span>
            <input
              name="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </label>
          <label>
            <span>Añadir imagen:</span>
            <input name="imagen" type="file" onChange={handleFile} />
          </label>
          {previsualizarImagen && (
            <img src={previsualizarImagen} alt="imagen avatar" />
          )}
          <button>Modificar</button>
          {estado === "error" && <p className="error">{mensaje}</p>}
          {estado === "ok" && <p>{mensaje}</p>}
        </form>
        <BorrarUsuario />
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

export default Usuario;
