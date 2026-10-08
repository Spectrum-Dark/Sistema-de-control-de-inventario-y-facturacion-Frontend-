import useClientes from "../../hooks/gestion/useClientes";
import FiltrosClientes from "../../components/gestion/clientes/filtros_clientes";
import TablaClientes from "../../components/gestion/clientes/tabla_clientes";
import FormularioClientes from "../../components/gestion/clientes/formulario_clientes";
import DetalleClientes from "../../components/gestion/clientes/detalle_clientes";

function Clientes() {
  const {
    clientesPaginados,
    paginaActual,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    totalRegistros,
    busqueda,
    setBusqueda,
    mostrarFormulario,
    alternarFormulario,
    registrarCliente,
    formulario,
    manejarCambio,
    clienteSeleccionado,
    verCliente,
    cerrarDetalle,
    modoEdicion,
    editarCliente,
    eliminarCliente,
  } = useClientes();

  return (
    <main className="space-y-6 pb-8">
      {/* Encabezado del Módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">
            Gestión de Clientes
          </h1>
          <p className="text-xs text-slate-500">
            Administración del directorio de clientes del sistema.
          </p>
        </div>

        {/* Botón principal oculto si el formulario está abierto */}
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={alternarFormulario}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-700 active:scale-95"
          >
            <span>+</span> Nuevo Cliente
          </button>
        )}
      </div>

      {/* Formulario Desplegable */}
      {mostrarFormulario && (
        <FormularioClientes
          modoEdicion={modoEdicion}
          formulario={formulario}
          manejarCambio={manejarCambio}
          registrarCliente={registrarCliente}
          cancelar={alternarFormulario}
        />
      )}

      {/* Ficha de Detalle Desplegable */}
      {clienteSeleccionado && (
        <DetalleClientes cliente={clienteSeleccionado} cerrar={cerrarDetalle} />
      )}

      {/* Filtro de Búsqueda */}
      <FiltrosClientes busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Tabla con Paginación Integrada */}
      <TablaClientes
        clientes={clientesPaginados}
        verCliente={verCliente}
        editarCliente={editarCliente}
        eliminarCliente={eliminarCliente}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        totalRegistros={totalRegistros}
      />
    </main>
  );
}

export default Clientes;
