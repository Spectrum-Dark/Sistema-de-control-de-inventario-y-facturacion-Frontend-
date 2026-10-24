import { useMemo } from "react";
import { ClipboardList, FileClock } from "lucide-react";
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

function ResumenHistorial({ historial }) {
  const correcciones = historial.filter((registro) => registro.tipo_operacion === "Correccion").length;
  const confirmaciones = historial.filter((registro) => registro.tipo_operacion === "Confirmacion").length;
  const metricas = [
    { etiqueta: "Movimientos registrados", valor: historial.length, Icono: ClipboardList },
    { etiqueta: "Correcciones", valor: correcciones, Icono: FileClock },
    { etiqueta: "Confirmaciones", valor: confirmaciones, Icono: ClipboardList },
  ];
  return (
    <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de correcciones">
      {metricas.map(({ etiqueta, valor, Icono }) => (
        <article key={etiqueta} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"><Icono size={18} /></span>
          <span><span className="block text-[11px] font-medium text-slate-500">{etiqueta}</span><span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span></span>
        </article>
      ))}
    </section>
  );
}

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
      acento="neutro"
      titulo={<span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><FileClock size={18} /></span>Correcciones</span>}
      subtitulo="Compras e inventario · Correcciones registradas."
      resumen={!cargando && !error ? <ResumenHistorial historial={historial} /> : null}
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
