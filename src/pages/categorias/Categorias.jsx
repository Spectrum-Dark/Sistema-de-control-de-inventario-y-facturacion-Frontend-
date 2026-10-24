import { Tags, Check, CircleMinus, Layers3 } from "lucide-react";
import { useCategorias } from "../../hooks/categorias/useCategorias";
import { usePermisos } from "../../hooks/sesion/usePermisos";
import { useGestionCrud } from "../../hooks/compartido/useGestionCrud";
import { eliminarCategoria } from "../../services/categorias/categoriasService";
import {
  FILTROS_INICIALES,
  filtrarCategorias,
} from "../../utils/categorias/filtros";
import PaginaCrud from "../../components/compartido/PaginaCrud";
import FiltrosCategorias from "../../components/categorias/FiltrosCategorias";
import TablaCategorias from "../../components/categorias/TablaCategorias";
import ModalCategoria from "../../components/categorias/ModalCategoria";

function ResumenCategorias({ categorias }) {
  const activas = categorias.filter((categoria) => categoria.estado === "Activa").length;
  const inactivas = categorias.filter((categoria) => categoria.estado === "Inactiva").length;
  const metricas = [
    { etiqueta: "Categorías registradas", valor: categorias.length, icono: Tags },
    { etiqueta: "Activas", valor: activas, icono: Check },
    { etiqueta: "Inactivas", valor: inactivas, icono: CircleMinus },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de categorías">
      {metricas.map(({ etiqueta, valor, icono: Icono }) => (
        <article key={etiqueta} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition hover:shadow-md">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition group-hover:bg-slate-100"><Icono size={18} strokeWidth={1.8} /></span>
          <span>
            <span className="block text-[11px] font-medium text-slate-500">{etiqueta}</span>
            <span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">{valor}</span>
          </span>
        </article>
      ))}
    </section>
  );
}

export default function Categorias() {
  const { categorias, cargando, error, recargar, actualizarEnLista } =
    useCategorias();
  const permisos = usePermisos();

  const g = useGestionCrud({
    items: categorias,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarCategorias,
    recargar,
    actualizarEnLista,
    claveId: "id_categoria",
    eliminar: eliminarCategoria,
    tituloEliminado: "Categoría eliminada",
  });

  return (
    <PaginaCrud
      acento="neutro"
      titulo={<span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"><Layers3 size={18} /></span>Categorías</span>}
      subtitulo="Organiza los repuestos en grupos fáciles de encontrar y administrar."
      resumen={!cargando && !error ? <ResumenCategorias categorias={categorias} /> : null}
      textoNuevo="Nueva categoría"
      textoCarga="Cargando categorías..."
      mensajeVacio="Aún no hay categorías registradas."
      mensajeSinResultados="Ninguna categoría coincide con la búsqueda o el filtro."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={categorias.length > 0}
      puedeCrear={permisos.puedeCrear}
      onNuevo={g.abrirModal}
      nuevoEnFiltros
      filtros={
        <FiltrosCategorias
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
        <TablaCategorias
          categorias={g.paginacion.visibles}
          puedeEditar={permisos.puedeEditar}
          puedeEliminar={permisos.puedeEliminar}
          onEditar={g.abrirModal}
          onEliminar={g.pedirEliminar}
        />
      }
      paginacion={g.paginacion}
      eliminando={g.eliminando}
      tituloEliminar="Eliminar categoría"
      mensajeEliminar={(c) => (
        <>
          ¿Seguro que quieres eliminar la categoría{" "}
          <strong>{c.nombre_categoria}</strong>? Esta acción no se puede
          deshacer.
        </>
      )}
      onConfirmarEliminar={g.confirmarEliminar}
      onCancelarEliminar={g.cancelarEliminar}
    >
      {g.modal && (
        <ModalCategoria
          key={g.modal.registro?.id_categoria ?? "nueva"}
          categoria={g.modal.registro}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}
    </PaginaCrud>
  );
}
