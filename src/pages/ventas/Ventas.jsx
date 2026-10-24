import { useState } from "react";
import { BadgeCheck, Ban, Clock3, ReceiptText } from "lucide-react";
import { sileo } from "sileo";
import { useVentas } from "../../hooks/ventas/useVentas";
import { useClientes } from "../../hooks/clientes/useClientes";
import { useProductos } from "../../hooks/productos/useProductos";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import {
  confirmarVenta,
  anularVenta,
} from "../../services/ventas/ventasService";
import {
  FILTROS_INICIALES,
  filtrarVentas,
} from "../../utils/ventas/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import FiltrosVentas from "../../components/ventas/FiltrosVentas";
import TablaVentas from "../../components/ventas/TablaVentas";
import ModalVenta from "../../components/ventas/ModalVenta";
import ModalDetalleVenta from "../../components/ventas/ModalDetalleVenta";
import ModalMotivoVenta from "../../components/ventas/ModalMotivoVenta";

function ResumenVentas({ ventas }) {
  const metricas = [
    { etiqueta: "Ventas registradas", valor: ventas.length, Icono: ReceiptText },
    { etiqueta: "Por confirmar", valor: ventas.filter((v) => v.estado === "Registrada").length, Icono: Clock3 },
    { etiqueta: "Confirmadas", valor: ventas.filter((v) => v.estado === "Confirmada").length, Icono: BadgeCheck },
    { etiqueta: "Canceladas", valor: ventas.filter((v) => v.estado === "Cancelada").length, Icono: Ban },
  ];
  return <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen de ventas">{metricas.map(({ etiqueta, valor, Icono }) => <article key={etiqueta} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"><Icono size={18} /></span><span><span className="block text-[11px] font-medium text-slate-500">{etiqueta}</span><span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span></span></article>)}</section>;
}

export default function Ventas() {
  const { ventas, cargando, error, recargar, actualizarEnLista } = useVentas();
  const { clientes } = useClientes();
  const { productos } = useProductos();
  const permisos = usePermisos();
  const puedeOperar = permisos.puedeCrear;

  const [detalle, setDetalle] = useState(null);
  const [confirmando, setConfirmando] = useState(null);
  const [anulando, setAnulando] = useState(null);

  const g = useGestionCrud({
    items: ventas,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarVentas,
    recargar,
    actualizarEnLista,
    claveId: "id_venta",
  });

  const confirmarSeleccionada = async () => {
    const respuesta = await confirmarVenta(confirmando.id_venta);
    sileo.success({ title: "Venta confirmada", description: respuesta.message });
    actualizarEnLista(respuesta.datos);
    setConfirmando(null);
  };

  const anularSeleccionada = async (motivo) => {
    const respuesta = await anularVenta(anulando.id_venta, { motivo });
    sileo.success({ title: "Venta anulada", description: respuesta.message });
    actualizarEnLista(respuesta.datos);
    setAnulando(null);
  };

  return (
    <PaginaCrud
      titulo={<span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><ReceiptText size={18} /></span>Ventas</span>}
      subtitulo="Ventas y facturación · Registro y seguimiento de ventas."
      resumen={!cargando && !error ? <ResumenVentas ventas={ventas} /> : null}
      textoNuevo="Nueva venta"
      textoCarga="Cargando ventas..."
      mensajeVacio="Aún no hay ventas registradas."
      mensajeSinResultados="Ninguna venta coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={ventas.length > 0}
      puedeCrear={puedeOperar}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosVentas
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
          puedeCrear={puedeOperar}
          onNuevo={g.abrirModal}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaVentas
          ventas={g.paginacion.visibles}
          puedeOperar={puedeOperar}
          onVerDetalle={setDetalle}
          onConfirmar={setConfirmando}
          onCorregir={g.abrirModal}
          onAnular={setAnulando}
        />
      }
      paginacion={g.paginacion}
    >
      {g.modal && (
        <ModalVenta
          key={g.modal.registro?.id_venta ?? "nueva"}
          venta={g.modal.registro}
          ventas={ventas}
          clientes={clientes}
          productos={productos}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
      {detalle && (
        <ModalDetalleVenta venta={detalle} onCerrar={() => setDetalle(null)} />
      )}
      {confirmando && (
        <ModalConfirmacion
          titulo="Confirmar venta"
          mensaje={
            <>
              Al confirmar la venta <strong>{confirmando.numero_venta}</strong>,
              se validarán las existencias y se descontarán los productos del inventario.
            </>
          }
          textoConfirmar="Confirmar venta"
          textoProceso="Confirmando..."
          variante="normal"
          onConfirmar={confirmarSeleccionada}
          onCerrar={() => setConfirmando(null)}
        />
      )}
      {anulando && (
        <ModalMotivoVenta
          venta={anulando}
          onConfirmar={anularSeleccionada}
          onCerrar={() => setAnulando(null)}
        />
      )}
    </PaginaCrud>
  );
}
