import useProductos from "../../hooks/gestion/useProductos";
import FiltrosProductos from "../../components/gestion/productos/filtros_productos";
import TablaProductos from "../../components/gestion/productos/tabla_productos";
import FormularioProducto from "../../components/gestion/productos/formulario_productos";
import DetalleProducto from "../../components/gestion/productos/detalle_productos";

function Productos() {
  const {
    productosPaginados,
    paginaActual,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    totalRegistros,
    busqueda,
    setBusqueda,
    categorias,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    marcas,
    marcaSeleccionada,
    setMarcaSeleccionada,
    mostrarFormulario,
    alternarFormulario,
    registrarProducto,
    formulario,
    manejarCambio,
    productoSeleccionado,
    verProducto,
    cerrarDetalle,
    modoEdicion,
    editarProducto,
  } = useProductos();

  return (
    <main className="space-y-6 pb-8">
      {/* Encabezado del Módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">
            Gestión de Productos
          </h1>
          <p className="text-xs text-slate-500">
            Administra el catálogo de repuestos, precios y existencias.
          </p>
        </div>

        {/* El botón solo se muestra si NO hay un formulario abierto */}
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={alternarFormulario}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-700 active:scale-95"
          >
            <span>+</span> Nuevo Producto
          </button>
        )}
      </div>

      {/* Formulario con animación de entrada */}
      {mostrarFormulario && (
        <FormularioProducto
          modoEdicion={modoEdicion}
          formulario={formulario}
          manejarCambio={manejarCambio}
          registrarProducto={registrarProducto}
          categorias={categorias}
          cancelar={alternarFormulario}
        />
      )}

      {/* Ficha de Detalle (Desplegable) */}
      {productoSeleccionado && (
        <DetalleProducto
          producto={productoSeleccionado}
          cerrar={cerrarDetalle}
        />
      )}

      {/* Controles de Búsqueda y Filtros */}
      <FiltrosProductos
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        marcas={marcas}
        marcaSeleccionada={marcaSeleccionada}
        setMarcaSeleccionada={setMarcaSeleccionada}
      />

      {/* Tabla Principal */}
      <TablaProductos
        productos={productosPaginados}
        verProducto={verProducto}
        editarProducto={editarProducto}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        totalRegistros={totalRegistros}
      />
    </main>
  );
}

export default Productos;
