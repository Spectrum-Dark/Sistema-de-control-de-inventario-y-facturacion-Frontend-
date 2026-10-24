import { UsersRound, Check, CircleMinus, UserRound } from "lucide-react";
import { useClientes } from "../../hooks/clientes/useClientes";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarCliente } from "../../services/clientes/clientesService";
import {
  FILTROS_INICIALES,
  filtrarClientes,
} from "../../utils/clientes/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosClientes from "../../components/clientes/FiltrosClientes";
import TablaClientes from "../../components/clientes/TablaClientes";
import ModalCliente from "../../components/clientes/ModalCliente";

function ResumenClientes({ clientes }) {
  const metricas = [
    { etiqueta: "Clientes registrados", valor: clientes.length, Icono: UsersRound },
    { etiqueta: "Activos", valor: clientes.filter((cliente) => cliente.estado === "Activo").length, Icono: Check },
    { etiqueta: "Inactivos", valor: clientes.filter((cliente) => cliente.estado === "Inactivo").length, Icono: CircleMinus },
  ];
  return <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de clientes">{metricas.map(({ etiqueta, valor, Icono }) => <article key={etiqueta} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"><Icono size={18} /></span><span><span className="block text-[11px] font-medium text-slate-500">{etiqueta}</span><span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span></span></article>)}</section>;
}

export default function Clientes() {
  const { clientes, cargando, error, recargar, actualizarEnLista } =
    useClientes();
  const permisos = usePermisos();

  const g = useGestionCrud({
    items: clientes,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarClientes,
    recargar,
    actualizarEnLista,
    claveId: "id_cliente",
    eliminar: eliminarCliente,
    tituloEliminado: "Cliente eliminado",
  });

  return (
    <PaginaCrud
      acento="neutro"
      titulo={<span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><UserRound size={18} /></span>Clientes</span>}
      subtitulo="Administra los datos de contacto de las personas que realizan compras."
      resumen={!cargando && !error ? <ResumenClientes clientes={clientes} /> : null}
      textoNuevo="Nuevo cliente"
      textoCarga="Cargando clientes..."
      mensajeVacio="Aún no hay clientes registrados."
      mensajeSinResultados="Ningún cliente coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={clientes.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosClientes
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
          puedeCrear={permisos.puedeCrear}
          onNuevo={g.abrirModal}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaClientes
          clientes={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar cliente"
      mensajeEliminar={(c) => (
        <>
          ¿Seguro que quieres eliminar al cliente{" "}
          <strong>{c.nombre_cliente}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalCliente
          key={g.modal.registro?.id_cliente ?? "nuevo"}
          cliente={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
