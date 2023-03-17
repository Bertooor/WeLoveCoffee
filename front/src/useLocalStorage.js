import { useEffect, useState } from "react";

const useLocalStorage = (nombre, valorInicial) => {
  const [valor, setValor] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(nombre)) || valorInicial;
    } catch (e) {
      return valorInicial;
    }
  });

  useEffect(() => {
    localStorage.setItem(nombre, JSON.stringify(valor));
  }, [nombre, valor]);

  return [valor, setValor];
};

export default useLocalStorage;
