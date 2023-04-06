import { useUsuario } from "../../../UsuarioContext";
import NuevoTema from "./NuevoTema";

function Admin() {
  const usuario = useUsuario();

  if (usuario?.usuario.rol === "admin") {
    return (
      <section>
        <h2>Zona de administración</h2>
        <NuevoTema />
      </section>
    );
  } else {
    return (
      <section>
        <h2 className="error">
          Lo siento, no tienes permisos para ésta sección.
        </h2>
      </section>
    );
  }
}

export default Admin;
