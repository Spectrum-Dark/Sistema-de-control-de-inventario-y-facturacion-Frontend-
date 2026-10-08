import useProveedores from "../../hooks/gestion/useProveedores";
import FiltrosProveedores from "../../components/gestion/proveedores/filtros_proveedores";
import TablaProveedores from "../../components/gestion/proveedores/tabla_proveedores";
import FormularioProveedores from "../../components/gestion/proveedores/formulario_proveedores";
import DetalleProveedores from "../../components/gestion/proveedores/detalle_proveedores";

function Proveedores() {
  const {
    proveedoresPaginados,
    paginaActual,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    totalRegistros,
    busqueda,
    setBusqueda,
    mostrarFormulario,
    alternarFormulario,
    registrarProveedor,
    formulario,
    manejarCambio,
    proveedorSeleccionado,
    verProveedor,
    cerrarDetalle,
    modoEdicion,
    editarProveedor,
    eliminarProveedor,
  } = useProveedores();

  return (
    <main className="space-y-6 pb-8">
      {/* Encabezado del Módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">
            Gestión de Proveedores
          </h1>
          <p className="text-xs text-slate-500">
            Administración del directorio de proveedores de repuestos.
          </p>
        </div>

        {/* Botón principal oculto si el formulario está abierto */}
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={alternarFormulario}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-700 active:scale-95"
          >
            <span>+</span> Nuevo Proveedor
          </button>
        )}
      </div>

      {/* Formulario Desplegable */}
      {mostrarFormulario && (
        <FormularioProveedores
          modoEdicion={modoEdicion}
          formulario={formulario}
          manejarCambio={manejarCambio}
          registrarProveedor={registrarProveedor}
          cancelar={alternarFormulario}
        />
      )}

      {/* Ficha de Detalle Desplegable */}
      {proveedorSeleccionado && (
        <DetalleProveedores
          proveedor={proveedorSeleccionado}
          cerrar={cerrarDetalle}
        />
      )}

      {/* Filtro de Búsqueda */}
      <FiltrosProveedores busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Tabla con Paginación Integrada */}
      <TablaProveedores
        proveedores={proveedoresPaginados}
        verProveedor={verProveedor}
        editarProveedor={editarProveedor}
        eliminarProveedor={eliminarProveedor}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        totalRegistros={totalRegistros}
      />
    </main>
  );
}

export default Proveedores;
