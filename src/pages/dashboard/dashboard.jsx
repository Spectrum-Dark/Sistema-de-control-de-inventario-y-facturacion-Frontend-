import TarjetaIndicador from "../../components/dashboard/tarjeta_indicador";
import GraficoVentas from "../../components/dashboard/grafico_ventas";
import GraficoProductos from "../../components/dashboard/grafico_productos";
import GraficoInventario from "../../components/dashboard/grafico_inventario";
import GraficoCategorias from "../../components/dashboard/grafico_categoria";
import StockBajo from "../../components/dashboard/stock_bajo";
import UltimasOperaciones from "../../components/dashboard/ultimas_operaciones";
import useDashboard from "../../hooks/useDashboard";

function Dashboard() {
  const { datosDashboard } = useDashboard();

  // Valores de respaldo si la API aún no ha cargado
  const indicadores = datosDashboard?.indicadores ?? {};
  const graficoVacio = { etiquetas: [], valores: [] };

  return (
    <main className="space-y-8 pb-8">
      {/* SECCIÓN 1: INDICADORES CLAVE */}
      <section aria-labelledby="indicadores-titulo">
        <h2
          id="indicadores-titulo"
          className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          Indicadores clave
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TarjetaIndicador
            titulo="Productos"
            valor={indicadores.productos ?? 0}
            descripcion="Productos registrados"
          />

          <TarjetaIndicador
            titulo="Clientes"
            valor={indicadores.clientes ?? 0}
            descripcion="Clientes registrados"
          />

          <TarjetaIndicador
            titulo="Ventas del período"
            valor={indicadores.ventasPeriodo ?? 0}
            descripcion="Ventas registradas"
          />

          <TarjetaIndicador
            titulo="Compras del período"
            valor={indicadores.comprasPeriodo ?? 0}
            descripcion="Compras registradas"
          />

          <TarjetaIndicador
            titulo="Stock bajo"
            valor={indicadores.stockBajo ?? 0}
            descripcion="Productos con existencia baja"
          />

          <TarjetaIndicador
            titulo="Valor del inventario"
            valor={`C$ ${(indicadores.valorInventario ?? 0).toFixed(2)}`}
            descripcion="Valor actual del inventario"
          />
        </div>
      </section>

      {/* SECCIÓN 2: GRÁFICOS Y ESTADÍSTICAS */}
      <section aria-labelledby="graficos-titulo">
        <h2
          id="graficos-titulo"
          className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          Análisis gráfico
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GraficoVentas datos={datosDashboard?.ventasPorPeriodo ?? graficoVacio} />
          <GraficoProductos datos={datosDashboard?.productosMasVendidos ?? graficoVacio} />
          <GraficoInventario datos={datosDashboard?.estadoInventario ?? graficoVacio} />
          <GraficoCategorias datos={datosDashboard?.ventasPorCategoria ?? graficoVacio} />
        </div>
      </section>

      {/* SECCIÓN 3: INFORMACIÓN OPERATIVA */}
      <section aria-labelledby="operativa-titulo">
        <h2
          id="operativa-titulo"
          className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          Información operativa
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StockBajo productos={datosDashboard?.productosStockBajo ?? []} />
          <UltimasOperaciones operaciones={datosDashboard?.ultimasOperaciones ?? []} />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;