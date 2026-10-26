// Importación del modo estricto de React para detectar posibles problemas en la aplicación durante el desarrollo
import { StrictMode } from 'react';
// Importación de la API moderna de renderizado para React 18+ (createRoot)
import { createRoot } from 'react-dom/client';
// Importación del enrutador basado en el historial del navegador para SPA (Single Page Application)
import { BrowserRouter } from 'react-router-dom';
// Importación de los estilos globales de la aplicación
import './index.css';
// Importación del componente raíz de la aplicación
import App from './App.jsx';
// Importación del proveedor de contexto para la gestión global de la sesión y autenticación del usuario
import AuthProvider from './context/sesion/AuthProvider';
// Importación del componente de notificaciones (toast) adaptado para ser responsivo
import ToasterResponsivo from './components/compartido/ToasterResponsivo.jsx';

// Selección del nodo DOM raíz ("root") y montaje del árbol de componentes de React
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Habilita el enrutamiento basado en URLs del navegador en toda la aplicación */}
    <BrowserRouter>
      {/* Proveedor de autenticación que envuelve la app para proveer el estado de sesión de forma global */}
      <AuthProvider>
        {/* Componente global para mostrar notificaciones flotantes adaptadas a dispositivos */}
        <ToasterResponsivo />
        {/* Componente principal que contiene la estructura y rutas de la interfaz */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
