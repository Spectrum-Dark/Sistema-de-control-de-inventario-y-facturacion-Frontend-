import { useState } from "react";
import { sileo } from "sileo";
import { usePaginacion } from "./usePaginacion";
import { hayFiltrosActivos } from "../../utils/compartido/filtros";

export function useGestionCrud({
  items,
  filtrosIniciales,
  filtrar,
  recargar,
  actualizarEnLista,
  claveId,
  eliminar,
  tituloEliminado,
  porPagina = 10,
}) {
  const [filtros, setFiltros] = useState(filtrosIniciales);
  // null = cerrada; { registro: null } = nuevo; { registro } = editar
  const [modal, setModal] = useState(null);
  const [eliminando, setEliminando] = useState(null);

  const filtrados = filtrar(items, filtros);
  const paginacion = usePaginacion(filtrados, porPagina);
  const hayFiltros = hayFiltrosActivos(filtros);

  // Al cambiar un filtro se vuelve a la primera página
  const cambiarFiltro = (campo, valor) => {
    setFiltros((anteriores) => ({ ...anteriores, [campo]: valor }));
    paginacion.irAPagina(1);
  };

  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales);
    paginacion.irAPagina(1);
  };

  const abrirModal = (registro = null) => setModal({ registro });
  const cerrarModal = () => setModal(null);

  // Al crear se vuelve a pedir la lista; al editar se actualiza solo esa fila
  const guardado = (datos, esNuevo) => {
    if (esNuevo) {
      recargar();
    } else {
      actualizarEnLista(datos);
    }
    setModal(null);
  };

  // Si el backend rechaza (409), el error lo muestra la ventana de confirmación
  const confirmarEliminar = async () => {
    const respuesta = await eliminar(eliminando[claveId]);
    sileo.success({ title: tituloEliminado, description: respuesta.message });
    setEliminando(null);
    recargar();
  };

  return {
    filtros,
    cambiarFiltro,
    limpiarFiltros,
    hayFiltros,
    filtrados,
    paginacion,
    modal,
    abrirModal,
    cerrarModal,
    guardado,
    eliminando,
    pedirEliminar: setEliminando,
    cancelarEliminar: () => setEliminando(null),
    confirmarEliminar,
  };
}
