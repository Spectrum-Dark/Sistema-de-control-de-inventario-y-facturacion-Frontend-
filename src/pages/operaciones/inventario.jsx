import useInventario from "../../hooks/operaciones/useInventario";
import Resumen_Inventario from "../../components/operaciones/inventario/resumen_inventario";
import Filtros_Inventario from "../../components/operaciones/inventario/filtros_inventario";
import Tabla_Existencias from "../../components/operaciones/inventario/tabla_existencias";
import Tabla_Movimientos from "../../components/operaciones/inventario/tabla_movimientos";

export default function Inventario() {
  const {
    productos,
    totalProductosTotal,
    paginaProductos,
    totalPaginasProductos,
    setPaginaProductos,

    movimientos,
    totalMovimientosTotal,
    paginaMovimientos,
    totalPaginasMovimientos,
    setPaginaMovimientos,

    resumen,
    busqueda,
    filtroEstado,
    productoSeleccionado,
    setBusqueda,
    setFiltroEstado,
    consultarProducto,
    limpiarFiltros,
  } = useInventario();

  return (
    <main className="space-y-6">
      {/* Encabezado del módulo */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Inventario
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Consulta las existencias actuales y los movimientos de los repuestos.
        </p>
      </div>

      {/* Indicadores generales */}
      <Resumen_Inventario resumen={resumen} />

      {/* Búsqueda y filtros */}
      <Filtros_Inventario
        busqueda={busqueda}
        filtroEstado={filtroEstado}
        setBusqueda={setBusqueda}
        setFiltroEstado={setFiltroEstado}
        limpiarFiltros={limpiarFiltros}
      />

      {/* Tabla de existencias (Paginada 10 en 10) */}
      <Tabla_Existencias
        productos={productos}
        consultarProducto={consultarProducto}
        paginaProductos={paginaProductos}
        totalPaginasProductos={totalPaginasProductos}
        setPaginaProductos={setPaginaProductos}
        totalProductosTotal={totalProductosTotal}
      />

      {/* Historial de movimientos (Paginado 20 en 20) */}
      <Tabla_Movimientos
        movimientos={movimientos}
        productoSeleccionado={productoSeleccionado}
        consultarProducto={consultarProducto}
        paginaMovimientos={paginaMovimientos}
        totalPaginasMovimientos={totalPaginasMovimientos}
        setPaginaMovimientos={setPaginaMovimientos}
        totalMovimientosTotal={totalMovimientosTotal}
      />
    </main>
  );
}
