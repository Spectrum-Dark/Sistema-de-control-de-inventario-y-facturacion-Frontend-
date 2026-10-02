import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  /* Deteccion de errores */
  <StrictMode>
    {/* Incluimos todas las rutas dentro */}
    <BrowserRouter>
      <App /> {/* Aplicacion */}
    </BrowserRouter>
  </StrictMode>,
);
