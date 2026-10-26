import { useState } from 'react';
import { BadgeCheck, Clock3, ShoppingCart } from 'lucide-react';
import { sileo } from 'sileo';
import { useCompras } from '../../hooks/compras/useCompras';
import { useProveedores } from '../../hooks/proveedores/useProveedores';
import { useProductos } from '../../hooks/productos/useProductos';
import { usePermisos } from '../../hooks/sesion/usePermisos';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
import { confirmarCompra } from '../../services/compras/comprasService';
import { FILTROS_INICIALES, filtrarCompras } from '../../utils/compras/filtros';
import PaginaCrud from '../../components/compartido/PaginaCrud';
import ModalConfirmacion from '../../components/compartido/ModalConfirmacion';
import FiltrosCompras from '../../components/compras/FiltrosCompras';
import TablaCompras from '../../components/compras/TablaCompras';
import ModalCompra from '../../components/compras/ModalCompra';
import ModalDetalleCompra from '../../components/compras/ModalDetalleCompra';

/**
 * COMPONENTE: ResumenCompras
 * Explicación: Componente visual de tipo KPI que recibe el listado completo de compras
 * y calcula de forma dinámica las métricas principales (totales, por confirmar y confirmadas)
 * utilizando el método filter para mostrarlas en tarjetas con iconos descriptivos.
 */
function ResumenCompras({ compras }) {
  // Arreglo de configuración que almacena la etiqueta, el cálculo de la métrica y su icono correspondiente.
  const metricas = [
    {
      etiqueta: 'Compras registradas',
      valor: compras.length,
      Icono: ShoppingCart,
    },
    {
      etiqueta: 'Por confirmar',
      valor: compras.filter((c) => c.estado === 'Registrada').length,
      Icono: Clock3,
    },
    {
      etiqueta: 'Confirmadas',
      valor: compras.filter((c) => c.estado === 'Confirmada').length,
      Icono: BadgeCheck,
    },
  ];
  return (
    <section
      className="grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de compras"
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
 * COMPONENTE PRINCIPAL: Compras
 * Explicación: Componente principal que actúa como contenedor y orquestador del módulo de compras,
 * integrando la lógica de datos mediante hooks personalizados y la interfaz gráfica de usuario.
 */
export default function Compras() {
  // Extracción de datos y funciones de control desde los hooks personalizados de la aplicación.
  const { compras, cargando, error, recargar, actualizarEnLista } =
    useCompras();
  const { proveedores } = useProveedores();
  const { productos } = useProductos();
  const permisos = usePermisos();

  // Validación de permisos del usuario actual para determinar si puede realizar operaciones de escritura.
  const puedeOperar = permisos.puedeCrear;

  // Estados locales para controlar la visibilidad y datos de los modales secundarios (detalle y confirmación).
  const [detalle, setDetalle] = useState(null);
  const [confirmando, setConfirmando] = useState(null);

  /**
   * Hook personalizado de gestión CRUD (useGestionCrud)
   * Explicación: Centraliza la lógica común para el manejo de estados de filtros, paginación,
   * modales de creación/edición y actualización del listado de elementos.
   */
  const g = useGestionCrud({
    items: compras,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarCompras,
    recargar,
    actualizarEnLista,
    claveId: 'id_compra',
  });

  /**
   * FUNCIÓN: confirmarSeleccionada
   * Explicación: Función asíncrona que envía la solicitud al servicio para confirmar la compra seleccionada,
   * muestra una notificación de éxito mediante la librería sileo, actualiza la lista local y cierra el modal de confirmación.
   */
  const confirmarSeleccionada = async () => {
    const respuesta = await confirmarCompra(confirmando.id_compra);
    sileo.success({
      title: 'Compra confirmada',
      description: respuesta.message,
    });
    actualizarEnLista(respuesta.datos);
    setConfirmando(null);
  };

  return (
    /* 
      Componente de diseño reutilizable (PaginaCrud)
      Explicación: Plantilla general que estandariza la estructura visual de las páginas con operaciones CRUD 
      (títulos, estados de carga, errores, filtros, tablas y paginación).
    */
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <ShoppingCart size={18} />
          </span>
          Compras
        </span>
      }
      subtitulo="Compras e inventario · Registro de compras a proveedores."
      resumen={
        !cargando && !error ? <ResumenCompras compras={compras} /> : null
      }
      textoNuevo="Nueva compra"
      textoCarga="Cargando compras..."
      mensajeVacio="Aún no hay compras registradas."
      mensajeSinResultados="Ninguna compra coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={compras.length > 0}
      puedeCrear={puedeOperar}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosCompras
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
        <TablaCompras
          compras={g.paginacion.visibles}
          puedeOperar={puedeOperar}
          onVerDetalle={setDetalle}
          onConfirmar={setConfirmando}
          onCorregir={g.abrirModal}
        />
      }
      paginacion={g.paginacion}
    >
      {/* Renderizado condicional del modal de creación o edición de compras */}
      {g.modal && (
        <ModalCompra
          key={g.modal.registro?.id_compra ?? 'nueva'}
          compra={g.modal.registro}
          compras={compras}
          proveedores={proveedores}
          productos={productos}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}

      {/* Renderizado condicional del modal para visualizar el detalle completo de una compra */}
      {detalle && (
        <ModalDetalleCompra
          compra={detalle}
          onCerrar={() => setDetalle(null)}
        />
      )}

      {/* Renderizado condicional del modal de confirmación antes de impactar el inventario */}
      {confirmando && (
        <ModalConfirmacion
          titulo="Confirmar compra"
          mensaje={
            <>
              Al confirmar la compra{' '}
              <strong>{confirmando.numero_compra}</strong>, sus productos se
              sumarán al inventario. Después solo podrás modificarla con una
              corrección, que queda en el historial.
            </>
          }
          textoConfirmar="Confirmar compra"
          textoProceso="Confirmando..."
          variante="normal"
          onConfirmar={confirmarSeleccionada}
          onCerrar={() => setConfirmando(null)}
        />
      )}
    </PaginaCrud>
  );
}
