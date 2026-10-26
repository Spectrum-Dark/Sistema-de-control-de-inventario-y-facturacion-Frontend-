import { useListado } from '../compartido/useListado';
import { listarClientes } from '../../services/clientes/clientesService';

// Hook personalizado 'useClientes' para administrar la recuperación, estado de carga, gestión de errores y actualización del directorio de clientes mediante el hook base 'useListado'.
export function useClientes() {
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarClientes,
    'id_cliente'
  );
  return { clientes: datos, cargando, error, recargar, actualizarEnLista };
}
