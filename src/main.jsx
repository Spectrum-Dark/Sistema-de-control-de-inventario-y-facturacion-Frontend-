import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sileo";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/sesion/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="bottom-right"
          options={{
            fill: "#1D293D",
            styles: {
              title: "text-white!",
              description: "text-white/80!",
            },
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
