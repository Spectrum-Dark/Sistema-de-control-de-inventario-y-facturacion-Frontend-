import useMarcas from "../../hooks/gestion/useMarcas";
import FiltrosMarcas from "../../components/gestion/marcas/filtros_marcas";
import TablaMarcas from "../../components/gestion/marcas/tabla_marcas";
import FormularioMarcas from "../../components/gestion/marcas/formulario_marcas";
import DetalleMarcas from "../../components/gestion/marcas/detalle_marcas";

function Marcas() {
  const {
    marcasPaginadas,
    paginaActual,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    totalRegistros,
    busqueda,
    setBusqueda,
    mostrarFormulario,
    alternarFormulario,
    registrarMarca,
    formulario,
    manejarCambio,
    marcaSeleccionada,
    verMarca,
    cerrarDetalle,
    modoEdicion,
    editarMarca,
    eliminarMarca,
  } = useMarcas();

  return (
    <main className="space-y-6 pb-8">
      {/* Encabezado del Módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">
            Gestión de Marcas
          </h1>
          <p className="text-xs text-slate-500">
            Administración de marcas de vehículos para compatibilidad de
            repuestos.
          </p>
        </div>

        {/* Botón principal oculto si el formulario está abierto */}
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={alternarFormulario}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-700 active:scale-95"
          >
            <span>+</span> Nueva Marca
          </button>
        )}
      </div>

      {/* Formulario Desplegable */}
      {mostrarFormulario && (
        <FormularioMarcas
          modoEdicion={modoEdicion}
          formulario={formulario}
          manejarCambio={manejarCambio}
          registrarMarca={registrarMarca}
          cancelar={alternarFormulario}
        />
      )}

      {/* Ficha de Detalle Desplegable */}
      {marcaSeleccionada && (
        <DetalleMarcas marca={marcaSeleccionada} cerrar={cerrarDetalle} />
      )}

      {/* Filtro de Búsqueda */}
      <FiltrosMarcas busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Tabla con Paginación Integrada */}
      <TablaMarcas
        marcas={marcasPaginadas}
        verMarca={verMarca}
        editarMarca={editarMarca}
        eliminarMarca={eliminarMarca}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        totalRegistros={totalRegistros}
      />
    </main>
  );
}

export default Marcas;
