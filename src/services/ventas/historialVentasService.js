import { peticion } from "../compartido/clienteApi";

export const listarHistorialVentas = () =>
  peticion("/ventas/historial/listar");
