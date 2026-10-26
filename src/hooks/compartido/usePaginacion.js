import { useState } from 'react';

/**
 * Hook personalizado 'usePaginacion' para manejar la paginación de colecciones de datos,
 * controlando la página actual, el cálculo del total de páginas y la porción visible de elementos.
 */
export function usePaginacion(items, porPagina = 10) {
  const [paginaSolicitada, setPaginaSolicitada] = useState(1);

  const total = items.length;
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina));

  // Si la lista se encoge (por ejemplo, al filtrar), la página se ajusta sola de manera segura.
  const pagina = Math.min(paginaSolicitada, totalPaginas);

  const inicio = (pagina - 1) * porPagina;

  const irAPagina = (numero) =>
    setPaginaSolicitada(Math.min(Math.max(1, numero), totalPaginas));

  return {
    pagina,
    totalPaginas,
    total,
    visibles: items.slice(inicio, inicio + porPagina),
    desde: total === 0 ? 0 : inicio + 1,
    hasta: Math.min(inicio + porPagina, total),
    irAPagina,
  };
}
