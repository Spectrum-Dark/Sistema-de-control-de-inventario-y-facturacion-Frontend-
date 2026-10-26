import { useListado } from '../compartido/useListado';
import { listarCategorias } from '../../services/categorias/categoriasService';

// Hook personalizado 'useCategorias' para gestionar la obtención, estado de carga, control de errores y actualización optimista del listado de categorías del sistema a través del hook base 'useListado'.
export function useCategorias() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarCategorias,
    'id_categoria'
  );
  return { categorias: datos, cargando, error, recargar, actualizarEnLista };
}
