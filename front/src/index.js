import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import WeLoveCoffee from "./WeLoveCoffee";
import { UsuarioProvider } from "./Funciones/UsuarioContext";
import ErrorBoundary from "./Funciones/ErrorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <ErrorBoundary>
          <WeLoveCoffee />
        </ErrorBoundary>
      </UsuarioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
