import useCompatibilidades from "../../hooks/gestion/useCompatibilidades";
import FiltrosCompatibilidades from "../../components/gestion/compatibilidades/filtros_compatibilidades";
import TablaCompatibilidades from "../../components/gestion/compatibilidades/tabla_compatibilidades";
import FormularioCompatibilidades from "../../components/gestion/compatibilidades/formulario_compatibilidades";
import DetalleCompatibilidades from "../../components/gestion/compatibilidades/detalle_compatibilidades";

function Compatibilidades() {
  const {
    productos,
    marcas,
    compatibilidadesPaginadas,
    paginaActual,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    totalRegistros,
    busqueda,
    setBusqueda,
    marcaSeleccionadaFiltro,
    setMarcaSeleccionadaFiltro,
    modeloSeleccionadoFiltro,
    setModeloSeleccionadoFiltro,
    modelosDisponiblesFiltro,
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,
    modelosDisponibles,
    registrarCompatibilidad,
    editarCompatibilidad,
    modoEdicion,
    compatibilidadSeleccionada,
    verCompatibilidad,
    cerrarDetalle,
    eliminarCompatibilidad,
  } = useCompatibilidades();

  return (
    <main className="space-y-6 pb-8">
      {/* Encabezado del Módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">
            Gestión de Compatibilidades
          </h1>
          <p className="text-xs text-slate-500">
            Relación de repuestos con marcas y modelos de vehículos.
          </p>
        </div>

        {/* Botón principal oculto si el formulario está abierto */}
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={alternarFormulario}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-700 active:scale-95"
          >
            <span>+</span> Nueva Compatibilidad
          </button>
        )}
      </div>

      {/* Formulario Desplegable */}
      {mostrarFormulario && (
        <FormularioCompatibilidades
          modoEdicion={modoEdicion}
          formulario={formulario}
          manejarCambio={manejarCambio}
          registrarCompatibilidad={registrarCompatibilidad}
          productos={productos}
          marcas={marcas}
          modelosDisponibles={modelosDisponibles}
          cancelar={alternarFormulario}
        />
      )}

      {/* Ficha de Detalle Desplegable */}
      {compatibilidadSeleccionada && (
        <DetalleCompatibilidades
          compatibilidad={compatibilidadSeleccionada}
          cerrar={cerrarDetalle}
        />
      )}

      {/* Filtros de Búsqueda */}
      <FiltrosCompatibilidades
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        marcas={marcas}
        marcaSeleccionadaFiltro={marcaSeleccionadaFiltro}
        setMarcaSeleccionadaFiltro={setMarcaSeleccionadaFiltro}
        modeloSeleccionadoFiltro={modeloSeleccionadoFiltro}
        setModeloSeleccionadoFiltro={setModeloSeleccionadoFiltro}
        modelosDisponiblesFiltro={modelosDisponiblesFiltro}
      />

      {/* Tabla con Paginación Integrada */}
      <TablaCompatibilidades
        compatibilidades={compatibilidadesPaginadas}
        verCompatibilidad={verCompatibilidad}
        editarCompatibilidad={editarCompatibilidad}
        eliminarCompatibilidad={eliminarCompatibilidad}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        totalRegistros={totalRegistros}
      />
    </main>
  );
}

export default Compatibilidades;
