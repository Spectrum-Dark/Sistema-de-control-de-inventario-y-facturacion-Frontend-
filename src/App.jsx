// Importación del componente de enrutamiento principal que gestiona todas las rutas de la aplicación
import AppRoutes from './routes/AppRoutes';
//
// Componente raíz de la aplicación
function App() {
  // Renderiza el sistema de rutas centralizado de la aplicación
  return <AppRoutes />;
}

// Exportación por defecto del componente App para ser montado en el punto de entrada principal (ej. main.jsx o index.js)
export default App;
