import { useMemo, useState } from "react";
import { BadgeCheck, FileText, ReceiptText } from "lucide-react";
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

function ResumenFacturas({ facturas }) {
  const metricas = [
    { etiqueta: "Facturas registradas", valor: facturas.length, Icono: ReceiptText },
    { etiqueta: "Emitidas", valor: facturas.filter((f) => f.estado === "Emitida").length, Icono: BadgeCheck },
    { etiqueta: "Anuladas", valor: facturas.filter((f) => f.estado === "Anulada").length, Icono: FileText },
  ];
  return <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de facturación">{metricas.map(({ etiqueta, valor, Icono }) => <article key={etiqueta} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"><Icono size={18} /></span><span><span className="block text-[11px] font-medium text-slate-500">{etiqueta}</span><span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span></span></article>)}</section>;
}

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
  const filtrosVista = <FiltrosFacturas filtros={filtros} onCambiar={cambiarFiltro} onLimpiar={limpiarFiltros} hayFiltros={hayFiltros} puedeCrear={puedeCrear} onEmitir={() => setModalEmitir(true)} />;

  return (
    <PaginaCrud
      acento="neutro"
      titulo={<span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><ReceiptText size={18} /></span>Facturación</span>}
      subtitulo="Consulta, emisión e impresión de facturas asociadas a ventas confirmadas."
      resumen={!cargandoFacturas && !error ? <ResumenFacturas facturas={facturas} /> : null}
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
