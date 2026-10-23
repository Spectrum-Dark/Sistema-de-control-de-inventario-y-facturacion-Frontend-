import { useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { sileo } from "sileo";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosFacturas from "../../components/facturacion/FiltrosFacturas";
import TablaFacturas from "../../components/facturacion/TablaFacturas";
import ModalEmitirFactura from "../../components/facturacion/ModalEmitirFactura";
import ModalAnularFactura from "../../components/facturacion/ModalAnularFactura";
import ModalDetalleFactura from "../../components/facturacion/ModalDetalleFactura";
import { useFacturas } from "../../hooks/facturacion/useFacturas";
import { useVentas } from "../../hooks/ventas/useVentas";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { usePaginacion } from "../../hooks/compartido/usePaginacion";
import { anularFactura, emitirFactura } from "../../services/facturacion/facturasService";
import { FILTROS_INICIALES, filtrarFacturas } from "../../utils/facturacion/formato";

export default function Facturacion() {
  const { facturas, cargando: cargandoFacturas, error: errorFacturas, recargar: recargarFacturas } = useFacturas();
  const { ventas, cargando: cargandoVentas, error: errorVentas, recargar: recargarVentas } = useVentas();
  const { puedeCrear } = usePermisos();
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [modalEmitir, setModalEmitir] = useState(false);
  const [facturaDetalle, setFacturaDetalle] = useState(null);
  const [facturaAnular, setFacturaAnular] = useState(null);

  const filtradas = useMemo(() => filtrarFacturas(facturas, filtros), [facturas, filtros]);
  const paginacion = usePaginacion(filtradas);
  const hayFiltros = Boolean(filtros.busqueda || filtros.estado);
  const recargar = () => { recargarFacturas(); recargarVentas(); };
  const cambiarFiltro = (campo, valor) => {
    setFiltros((actuales) => ({ ...actuales, [campo]: valor }));
    paginacion.irAPagina(1);
  };
  const limpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES);
    paginacion.irAPagina(1);
  };

  const handleEmitir = async (datos) => {
    const respuesta = await emitirFactura(datos);
    sileo.success({ title: "Factura emitida", description: respuesta.message });
    setModalEmitir(false);
    recargar();
  };

  const handleAnular = async (factura, observaciones) => {
    const respuesta = await anularFactura(factura.id_factura, observaciones ? { observaciones } : {});
    sileo.success({ title: "Factura anulada", description: respuesta.message });
    setFacturaAnular(null);
    recargarFacturas();
  };

  const error = errorFacturas || errorVentas;
  const filtrosVista = (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">Solo se pueden facturar ventas confirmadas que aún no tengan una factura.</p>
        <div className="flex flex-wrap items-center gap-2">
          {puedeCrear && <button type="button" onClick={() => setModalEmitir(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-900"><FilePlus2 size={16} />Emitir factura</button>}
        </div>
      </div>
      <FiltrosFacturas filtros={filtros} onCambiar={cambiarFiltro} onLimpiar={limpiarFiltros} hayFiltros={hayFiltros} />
    </div>
  );

  return (
    <PaginaCrud
      titulo="Facturación"
      subtitulo="Consulta, emisión e impresión de facturas asociadas a ventas confirmadas."
      textoCarga="Cargando facturas..."
      mensajeVacio="Aún no hay facturas emitidas."
      mensajeSinResultados="Ninguna factura coincide con la búsqueda o el filtro."
      cargando={cargandoFacturas || cargandoVentas}
      error={error}
      recargar={recargar}
      hayDatos={facturas.length > 0}
      puedeCrear={false}
      filtros={filtrosVista}
      hayFiltros={hayFiltros}
      hayResultados={filtradas.length > 0}
      tabla={<TablaFacturas facturas={paginacion.visibles} puedeAnular={puedeCrear} onVer={setFacturaDetalle} onAnular={setFacturaAnular} />}
      paginacion={paginacion}
    >
      {modalEmitir && <ModalEmitirFactura ventas={ventas} facturas={facturas} onEmitir={handleEmitir} onCerrar={() => setModalEmitir(false)} />}
      {facturaDetalle && <ModalDetalleFactura factura={facturaDetalle} onCerrar={() => setFacturaDetalle(null)} />}
      {facturaAnular && <ModalAnularFactura factura={facturaAnular} onAnular={handleAnular} onCerrar={() => setFacturaAnular(null)} />}
    </PaginaCrud>
  );
}
