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
          position="top-right"
          offset={{ top: 20, right: 20 }}
          options={{
            fill: "var(--sileo-fill)",
            roundness: 14,
            duration: 4200,
            styles: {
              title: "app-toast-title",
              description: "app-toast-description",
              badge: "app-toast-badge",
            },
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
