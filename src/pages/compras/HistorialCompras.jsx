import { useMemo } from "react";
import { useHistorialCompras } from "../../hooks/compras/useHistorialCompras";
import { useProveedores } from "../../hooks/proveedores/useProveedores";
import { useProductos } from "../../hooks/productos/useProductos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import {
  FILTROS_INICIALES,
  filtrarHistorial,
} from "../../utils/compras/filtrosHistorial";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosHistorial from "../../components/compras/FiltrosHistorial";
import TablaHistorial from "../../components/compras/TablaHistorial";
import ModalCambiosCompra from "../../components/compras/ModalCambiosCompra";

export default function HistorialCompras() {
  const { historial, cargando, error, recargar, actualizarEnLista } =
    useHistorialCompras();
  const { proveedores } = useProveedores();
  const { productos } = useProductos();

  const nombresProveedores = useMemo(
    () => Object.fromEntries(proveedores.map((p) => [p.id_proveedor, p.nombre_proveedor])),
    [proveedores]
  );
  const nombresProductos = useMemo(
    () => Object.fromEntries(productos.map((p) => [p.id_producto, p.nombre_producto])),
    [productos]
  );

  const g = useGestionCrud({
    items: historial,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarHistorial,
    recargar,
    actualizarEnLista,
    claveId: "id_historial_compra",
  });

  return (
    <PaginaCrud
      titulo="Historial de compras"
      subtitulo="Compras e inventario · Historial y correcciones."
      textoCarga="Cargando historial..."
      mensajeVacio="Aún no hay correcciones de compras registradas."
      mensajeSinResultados="Ningún registro coincide con la búsqueda."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={historial.length > 0}
      puedeCrear={false}
      filtros={
        <FiltrosHistorial
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaHistorial
          historial={g.paginacion.visibles}
          onVerCambios={g.abrirModal}
        />
      }
      paginacion={g.paginacion}
    >
      {g.modal && (
        <ModalCambiosCompra
          registro={g.modal.registro}
          nombresProveedores={nombresProveedores}
          nombresProductos={nombresProductos}
          onCerrar={g.cerrarModal}
        />
      )}
    </PaginaCrud>
  );
}