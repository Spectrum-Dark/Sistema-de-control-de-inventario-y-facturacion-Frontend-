import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Pagina principal</h1>} />
      <Route path="/prueba" element={<h1>Ruta prueba</h1>} />
    </Routes>
  );
}

export default App;
