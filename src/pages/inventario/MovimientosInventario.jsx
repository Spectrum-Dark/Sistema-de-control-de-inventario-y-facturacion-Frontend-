import { useMemo } from "react";
import { useMovimientos } from "../../hooks/inventario/useMovimientos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import {
  FILTROS_INICIALES,
  filtrarMovimientos,
} from "../../utils/inventario/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosMovimientos from "../../components/inventario/FiltrosMovimientos";
import TablaMovimientos from "../../components/inventario/TablaMovimientos";

export default function MovimientosInventario() {
  const { movimientos, cargando, error, recargar, actualizarEnLista } =
    useMovimientos();

  // Los tipos disponibles salen de los propios movimientos
  const tipos = useMemo(
    () => [...new Set(movimientos.map((m) => m.tipo_movimiento))].filter(Boolean),
    [movimientos]
  );

  const g = useGestionCrud({
    items: movimientos,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarMovimientos,
    recargar,
    actualizarEnLista,
    claveId: "id_movimiento",
  });

  return (
    <PaginaCrud
      titulo="Movimientos de inventario"
      subtitulo="Compras e inventario · Entradas, salidas y existencias."
      textoCarga="Cargando movimientos..."
      mensajeVacio="Aún no hay movimientos de inventario."
      mensajeSinResultados="Ningún movimiento coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={movimientos.length > 0}
      puedeCrear={false}
      filtros={
        <FiltrosMovimientos
          filtros={g.filtros}
          tipos={tipos}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={<TablaMovimientos movimientos={g.paginacion.visibles} />}
      paginacion={g.paginacion}
    />
  );
}