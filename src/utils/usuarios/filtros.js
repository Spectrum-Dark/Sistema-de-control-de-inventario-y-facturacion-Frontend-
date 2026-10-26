// Importación de la función de utilidad para realizar búsquedas textuales flexibles
import { coincideTexto } from '../compartido/filtros';

// Objeto constante que define el estado inicial por defecto de los filtros de usuarios
export const FILTROS_INICIALES = { busqueda: '', rol: '', estado: '' };

// Función pura de filtrado que recibe la lista de usuarios y el objeto con los criterios de filtrado
export const filtrarUsuarios = (usuarios, filtros) =>
  usuarios.filter(
    (u) =>
      // Evalúa si la cadena de búsqueda coincide con alguno de los campos clave del usuario (nombre, usuario o correo)
      coincideTexto(filtros.busqueda, [
        u.nombre_completo,
        u.nombre_usuario,
        u.correo,
      ]) &&
      // Aplica el filtro por rol de manera condicional: si no se especifica rol se omite, de lo contrario se convierte a string para asegurar una comparación estricta segura
      (!filtros.rol || String(u.id_rol) === filtros.rol) &&
      // Aplica el filtro por estado de manera condicional: si no se especifica estado se omite, si existe evalúa coincidencia exacta
      (!filtros.estado || u.estado === filtros.estado)
  );
