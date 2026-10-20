import { peticion } from "../compartido/clienteApi";

export const listarCompatibilidades = () =>
  peticion("/compatibilidades/listar");

export const crearCompatibilidad = (datos) =>
  peticion("/compatibilidades/registrar", { metodo: "POST", cuerpo: datos });

export const actualizarCompatibilidad = (id, cambios) =>
  peticion(`/compatibilidades/actualizar/${id}`, {
    metodo: "PUT",
    cuerpo: cambios,
  });

export const eliminarCompatibilidad = (id) =>
  peticion(`/compatibilidades/eliminar/${id}`, { metodo: "DELETE" });
