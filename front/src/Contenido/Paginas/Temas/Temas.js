import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./Temas.css";
import Comentarios from "../Comentarios/Comentarios";
import { useUsuario } from "../../../UsuarioContext";
import BorrarTema from "../Admin/BorrarTema";

function Temas() {
  const usuario = useUsuario();
  const [temas, setTemas] = useState();

  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [llave, setLlave] = useState(0);
  const recarga = () => setLlave((k) => k + 1);

  const [mostrarTema, setMostrarTema] = useState(true);

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(`${process.env.REACT_APP_API}`);
      const datos = await respuesta.json();

      if (datos.estado === "error") {
        setEstado("error");
        setMensaje(datos.mensaje);
      } else {
        setEstado("ok");
        setTemas(datos);
      }
    })();
  }, [usuario, llave]);

  return (
    <>
      <section className="temas">
        <h2>Temas</h2>
        <nav>
          <label
            className="checkbutton"
            onClick={() => {
              setMostrarTema(true);
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </label>
          <ul className={mostrarTema ? "mostrar" : "nomostrar"}>
            {temas &&
              temas.datos?.map((tema) => (
                <li key={tema.id}>
                  {usuario?.usuario.id === 1 && (
                    <BorrarTema tema={tema.id} recarga={recarga} />
                  )}
                  <NavLink
                    to={`/${tema.id}`}
                    onClick={() => {
                      setMostrarTema(false);
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/archivos/${tema.imagen}`}
                      alt="imagen usuario"
                    />
                    <h3>{tema.tema}</h3>
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
        {estado === "error" && <p className="error">{mensaje}</p>}
      </section>
      <Routes>
        <Route path="/:id" element={<Comentarios temas={temas} />} />
      </Routes>
    </>
  );
}

export default Temas;
