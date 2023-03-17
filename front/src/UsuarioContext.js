import { createContext, useContext } from "react";
import useLocalStorage from "./useLocalStorage";

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useLocalStorage("sesion");

  return (
    <UsuarioContext.Provider value={[usuario, setUsuario]}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext)[0];
export const useSetUsuario = () => useContext(UsuarioContext)[1];
