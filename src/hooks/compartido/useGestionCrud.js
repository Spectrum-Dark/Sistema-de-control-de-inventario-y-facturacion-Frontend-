import { useState } from 'react';
import { sileo } from 'sileo';
import { usePaginacion } from './usePaginacion';
import { hayFiltrosActivos } from '../../utils/compartido/filtros';

// Hook personalizado 'useGestionCrud' para centralizar la lógica de estado y operaciones CRUD de la interfaz (filtros, paginación, control de modales de creación/edición y diálogos de eliminación).
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

  // Al cambiar cualquier parámetro de filtrado, reinicia la paginación a la primera página.
  const cambiarFiltro = (campo, valor) => {
    setFiltros((anteriores) => ({ ...anteriores, [campo]: valor }));
    paginacion.irAPagina(1);
  };

  // Restablece los filtros a sus valores predeterminados y regresa a la página inicial.
  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales);
    paginacion.irAPagina(1);
  };

  // Funciones para controlar la apertura y cierre de las ventanas modales de gestión.
  const abrirModal = (registro = null) => setModal({ registro });
  const cerrarModal = () => setModal(null);

  // Manejador posterior al guardado exitoso: recarga el listado completo si es un registro nuevo o actualiza de manera optimista la fila modificada.
  const guardado = (datos, esNuevo) => {
    if (esNuevo) {
      recargar();
    } else {
      actualizarEnLista(datos);
    }
    setModal(null);
  };

  // Procesa la eliminación de un registro mediante la API, notificando al usuario y recargando el listado.
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
