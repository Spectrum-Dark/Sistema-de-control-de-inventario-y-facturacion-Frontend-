import useCategorias from "../../hooks/gestion/useCategorias";
import FiltrosCategoria from "../../components/gestion/categorias/filtros_categoria";
import TablaCategoria from "../../components/gestion/categorias/tabla_categoria";
import FormularioCategoria from "../../components/gestion/categorias/formulario_categoria";
import DetalleCategoria from "../../components/gestion/categorias/detalle_categoria";

function Categorias() {
  const {
    categoriasPaginadas,
    paginaActual,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    totalRegistros,
    busqueda,
    setBusqueda,
    mostrarFormulario,
    alternarFormulario,
    registrarCategoria,
    formulario,
    manejarCambio,
    categoriaSeleccionada,
    verCategoria,
    cerrarDetalle,
    modoEdicion,
    editarCategoria,
    eliminarCategoria,
  } = useCategorias();

  return (
    <main className="space-y-6 pb-8">
      {/* Encabezado del Módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">
            Gestión de Categorías
          </h1>
          <p className="text-xs text-slate-500">
            Administración de las categorías para la clasificación de repuestos.
          </p>
        </div>

        {/* Botón principal oculto si el formulario está desplegado */}
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={alternarFormulario}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-700 active:scale-95"
          >
            <span>+</span> Nueva Categoría
          </button>
        )}
      </div>

      {/* Formulario Desplegable */}
      {mostrarFormulario && (
        <FormularioCategoria
          modoEdicion={modoEdicion}
          formulario={formulario}
          manejarCambio={manejarCambio}
          registrarCategoria={registrarCategoria}
          cancelar={alternarFormulario}
        />
      )}

      {/* Detalle Desplegable */}
      {categoriaSeleccionada && (
        <DetalleCategoria
          categoria={categoriaSeleccionada}
          cerrar={cerrarDetalle}
        />
      )}

      {/* Filtros y Búsqueda */}
      <FiltrosCategoria busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Tabla con Paginación Integrada */}
      <TablaCategoria
        categorias={categoriasPaginadas}
        verCategoria={verCategoria}
        editarCategoria={editarCategoria}
        eliminarCategoria={eliminarCategoria}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        totalRegistros={totalRegistros}
      />
    </main>
  );
}

export default Categorias;
