import { peticion } from "../compartido/clienteApi";

export const listarHistorialCompras = () =>
  peticion("/compras/historial/listar");