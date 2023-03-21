import { useEffect, useState } from "react";
import "./Temas.css";

function Temas() {
  const [temas, setTemas] = useState();

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(`${process.env.REACT_APP_API}/`);
      const datos = await respuesta.json();

      setTemas(datos);
    })();
  }, []);

  return (
    <section className="temas">
      <h2>Temas</h2>
      <ul>
        {temas &&
          temas.datos.map((tema) => (
            <li key={tema.id}>
              <img
                src={`${process.env.REACT_APP_API}/archivos/${tema.imagen}`}
                alt="imagen usuario"
              />
              <h3>{tema.tema}</h3>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Temas;
