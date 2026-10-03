import { Navigate, Route, Routes } from "react-router-dom";
/* Importamos los archivos vistas */
import Sesion from "./pages/sesion";
import Aplicacion from "./layouts/aplicacion";
import Inicio from "./pages/inicio";
import Productos from "./pages/productos";
import Categorias from "./pages/categorias"
import Marcas from "./pages/marcas"
import Modelos from "./pages/modelos"
import Compatibilidades from "./pages/compatibilidades"
import Proveedores from "./pages/proveedores"
import Clientes from "./pages/clientes"

function App() {
  return (
    <Routes>
      {/* Pordefecto */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      {/* Rutas de inicio */}
      <Route path="/login" element={<Sesion />} />

      {/* Aplicacion principal (elemento padre) */}
      <Route element={<Aplicacion />}>
        {/* elementos hijos */}
        <Route path="/app/home/dashboard" element={<Inicio />} />
        <Route path="/app/gestion/productos" element={<Productos />} />
        <Route path="/app/gestion/categorias" element={<Categorias />} />
        <Route path="/app/gestion/marcas" element={<Marcas />} />
        <Route path="/app/gestion/modelos" element={<Modelos />} />
        <Route path="/app/gestion/compatibilidades" element={<Compatibilidades />} />
        <Route path="/app/gestion/proveedores" element={<Proveedores />} />
        <Route path="/app/gestion/clientes" element={<Clientes />} />
      </Route>
    </Routes>
  );
}

export default App;
