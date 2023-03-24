import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./Temas.css";
import Comentarios from "../Comentarios/Comentarios";
import { useUsuario } from "../../../UsuarioContext";

function Temas() {
  const [temas, setTemas] = useState();
  const usuario = useUsuario();

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(`${process.env.REACT_APP_API}`);
      const datos = await respuesta.json();

      setTemas(datos);
    })();
  }, [usuario]);

  return (
    <>
      <section className="temas">
        <h2>Temas</h2>
        <nav>
          <ul>
            {temas &&
              temas.datos?.map((tema) => (
                <NavLink to={`/${tema.id}`} key={tema.id}>
                  <li>
                    <img
                      src={`${process.env.REACT_APP_API}/archivos/${tema.imagen}`}
                      alt="imagen usuario"
                    />
                    <h3>{tema.tema}</h3>
                  </li>
                </NavLink>
              ))}
          </ul>
        </nav>
      </section>
      <Routes>
        <Route path="/:id" element={<Comentarios />} />
      </Routes>
    </>
  );
}

export default Temas;
