import { useMemo, useState } from 'react';
import { BadgeCheck, FileText, ReceiptText } from 'lucide-react';
import { sileo } from 'sileo';
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosFacturas from '../../components/facturacion/FiltrosFacturas';
import TablaFacturas from '../../components/facturacion/TablaFacturas';
import ModalEmitirFactura from '../../components/facturacion/ModalEmitirFactura';
import ModalAnularFactura from '../../components/facturacion/ModalAnularFactura';
import ModalDetalleFactura from '../../components/facturacion/ModalDetalleFactura';
import { useFacturas } from '../../hooks/facturacion/useFacturas';
import { useVentas } from '../../hooks/ventas/useVentas';
import { usePermisos } from '../../hooks/sesion/usePermisos';
import { usePaginacion } from '../../hooks/compartido/usePaginacion';
import {
  anularFactura,
  emitirFactura,
} from '../../services/facturacion/facturasService';
import {
  FILTROS_INICIALES,
  filtrarFacturas,
} from '../../utils/facturacion/formato';

/**
 * COMPONENTE: ResumenFacturas
 * Explicación: Componente de tipo KPI que calcula y muestra las métricas clave del sistema de facturación
 * (total de facturas, emitidas y anuladas) utilizando filtrados sobre el listado general.
 */
function ResumenFacturas({ facturas }) {
  const metricas = [
    {
      etiqueta: 'Facturas registradas',
      valor: facturas.length,
      Icono: ReceiptText,
    },
    {
      etiqueta: 'Emitidas',
      valor: facturas.filter((f) => f.estado === 'Emitida').length,
      Icono: BadgeCheck,
    },
    {
      etiqueta: 'Anuladas',
      valor: facturas.filter((f) => f.estado === 'Anulada').length,
      Icono: FileText,
    },
  ];
  return (
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de facturación"
    >
      {metricas.map(({ etiqueta, valor, Icono }) => (
        <article
          key={etiqueta}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
            <Icono size={18} />
          </span>
          <span>
            <span className="block text-[11px] font-medium text-slate-500">
              {etiqueta}
            </span>
            <span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">
              {valor}
            </span>
          </span>
        </article>
      ))}
    </section>
  );
}

/**
 * COMPONENTE PRINCIPAL: Facturacion
 * Explicación: Orquestador del módulo de facturación que gestiona la consulta de facturas y ventas,
 * el control de filtros, la paginación local y las acciones asíncronas para emitir o anular facturas.
 */
export default function Facturacion() {
  // Hooks personalizados para obtener los listados de facturas y ventas, así como verificar los permisos de usuario.
  const {
    facturas,
    cargando: cargandoFacturas,
    error: errorFacturas,
    recargar: recargarFacturas,
  } = useFacturas();
  const {
    ventas,
    cargando: cargandoVentas,
    error: errorVentas,
    recargar: recargarVentas,
  } = useVentas();
  const { puedeCrear } = usePermisos();

  // Estados locales para la gestión de filtros y visibilidad de los diferentes modales de operación.
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [modalEmitir, setModalEmitir] = useState(false);
  const [facturaDetalle, setFacturaDetalle] = useState(null);
  const [facturaAnular, setFacturaAnular] = useState(null);

  // Memorización del listado filtrado de facturas y asignación del hook de paginación.
  const filtradas = useMemo(
    () => filtrarFacturas(facturas, filtros),
    [facturas, filtros]
  );
  const paginacion = usePaginacion(filtradas);
  const hayFiltros = Boolean(filtros.busqueda || filtros.estado);

  // Función combinada para recargar tanto las facturas como las ventas asociadas.
  const recargar = () => {
    recargarFacturas();
    recargarVentas();
  };

  // Funciones de control para actualizar los campos de búsqueda/filtros y reiniciar la paginación a la página 1.
  const cambiarFiltro = (campo, valor) => {
    setFiltros((actuales) => ({ ...actuales, [campo]: valor }));
    paginacion.irAPagina(1);
  };
  const limpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES);
    paginacion.irAPagina(1);
  };

  /**
   * FUNCIÓN: handleEmitir
   * Explicación: Envía los datos al servicio para emitir una nueva factura, muestra una notificación de éxito,
   * cierra el modal correspondiente y recarga los datos del módulo.
   */
  const handleEmitir = async (datos) => {
    const respuesta = await emitirFactura(datos);
    sileo.success({ title: 'Factura emitida', description: respuesta.message });
    setModalEmitir(false);
    recargar();
  };

  /**
   * FUNCIÓN: handleAnular
   * Explicación: Ejecuta la petición para anular una factura específica con sus respectivas observaciones,
   * notifica el éxito de la operación y actualiza la lista de facturas.
   */
  const handleAnular = async (factura, observaciones) => {
    const respuesta = await anularFactura(
      factura.id_factura,
      observaciones ? { observaciones } : {}
    );
    sileo.success({ title: 'Factura anulada', description: respuesta.message });
    setFacturaAnular(null);
    recargarFacturas();
  };

  // Consolidación de posibles errores provenientes de facturas o ventas.
  const error = errorFacturas || errorVentas;
  const filtrosVista = (
    <FiltrosFacturas
      filtros={filtros}
      onCambiar={cambiarFiltro}
      onLimpiar={limpiarFiltros}
      hayFiltros={hayFiltros}
      puedeCrear={puedeCrear}
      onEmitir={() => setModalEmitir(true)}
    />
  );

  return (
    /* 
      Componente de diseño reutilizable (PaginaCrud)
      Explicación: Estructura estándar que organiza la interfaz de la página de facturación 
      (título, métricas de resumen, filtros, tabla con paginación y modales contextuales).
    */
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <ReceiptText size={18} />
          </span>
          Facturación
        </span>
      }
      subtitulo="Consulta, emisión e impresión de facturas asociadas a ventas confirmadas."
      resumen={
        !cargandoFacturas && !error ? (
          <ResumenFacturas facturas={facturas} />
        ) : null
      }
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
      tabla={
        <TablaFacturas
          facturas={paginacion.visibles}
          puedeAnular={puedeCrear}
          onVer={setFacturaDetalle}
          onAnular={setFacturaAnular}
        />
      }
      paginacion={paginacion}
    >
      {/* Renderizado condicional del modal para emitir una nueva factura */}
      {modalEmitir && (
        <ModalEmitirFactura
          ventas={ventas}
          facturas={facturas}
          onEmitir={handleEmitir}
          onCerrar={() => setModalEmitir(false)}
        />
      )}

      {/* Renderizado condicional del modal para ver el detalle de una factura */}
      {facturaDetalle && (
        <ModalDetalleFactura
          factura={facturaDetalle}
          onCerrar={() => setFacturaDetalle(null)}
        />
      )}

      {/* Renderizado condicional del modal para anular una factura existente */}
      {facturaAnular && (
        <ModalAnularFactura
          factura={facturaAnular}
          onAnular={handleAnular}
          onCerrar={() => setFacturaAnular(null)}
        />
      )}
    </PaginaCrud>
  );
}
