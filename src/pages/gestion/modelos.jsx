import useModelos from "../../hooks/gestion/useModelos";
import FiltrosModelos from "../../components/gestion/modelos/filtros_modelos";
import TablaModelos from "../../components/gestion/modelos/tabla_modelos";
import FormularioModelos from "../../components/gestion/modelos/formulario_modelos";
import DetalleModelos from "../../components/gestion/modelos/detalle_modelos";

function Modelos() {
  const {
    modelosPaginados,
    marcas,
    paginaActual,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    totalRegistros,
    busqueda,
    setBusqueda,
    marcaSeleccionadaFiltro,
    setMarcaSeleccionadaFiltro,
    mostrarFormulario,
    alternarFormulario,
    registrarModelo,
    formulario,
    manejarCambio,
    modeloSeleccionado,
    verModelo,
    cerrarDetalle,
    modoEdicion,
    editarModelo,
    eliminarModelo,
  } = useModelos();

  return (
    <main className="space-y-6 pb-8">
      {/* Encabezado del Módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">
            Gestión de Modelos
          </h1>
          <p className="text-xs text-slate-500">
            Administración de modelos por marca para el control de
            compatibilidad.
          </p>
        </div>

        {/* Botón principal oculto si el formulario está abierto */}
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={alternarFormulario}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-700 active:scale-95"
          >
            <span>+</span> Nuevo Modelo
          </button>
        )}
      </div>

      {/* Formulario Desplegable */}
      {mostrarFormulario && (
        <FormularioModelos
          modoEdicion={modoEdicion}
          formulario={formulario}
          manejarCambio={manejarCambio}
          registrarModelo={registrarModelo}
          marcas={marcas}
          cancelar={alternarFormulario}
        />
      )}

      {/* Ficha de Detalle Desplegable */}
      {modeloSeleccionado && (
        <DetalleModelos modelo={modeloSeleccionado} cerrar={cerrarDetalle} />
      )}

      {/* Filtros de Búsqueda y Marca */}
      <FiltrosModelos
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        marcas={marcas}
        marcaSeleccionadaFiltro={marcaSeleccionadaFiltro}
        setMarcaSeleccionadaFiltro={setMarcaSeleccionadaFiltro}
      />

      {/* Tabla con Paginación Integrada */}
      <TablaModelos
        modelos={modelosPaginados}
        verModelo={verModelo}
        editarModelo={editarModelo}
        eliminarModelo={eliminarModelo}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        totalRegistros={totalRegistros}
      />
    </main>
  );
}

export default Modelos;
