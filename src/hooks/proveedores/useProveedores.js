import { useListado } from '../compartido/useListado';
import { listarProveedores } from '../../services/proveedores/proveedoresService';

/**
 * Custom Hook para gestionar el estado y la lógica del listado de proveedores.
 * Separa la lógica de negocio, manejo de errores y estados de carga de las vistas,
 * aplicando el principio DRY mediante el hook genérico useListado.
 */
export function useProveedores() {
  // Invocamos el hook genérico pasando la función de servicio que hace la petición HTTP
  // y la clave primaria de la entidad ("id_proveedor").
  const { datos, cargando, error, recargar, actualizarEnLista } = useListado(
    listarProveedores,
    'id_proveedor'
  );

  // Retornamos el objeto con los datos y funciones, renombrando "datos" a "proveedores"
  // para darle un contexto semántico claro y limpio al componente que lo utilice.
  return {
    proveedores: datos,
    cargando,
    error,
    recargar,
    actualizarEnLista,
  };
}
