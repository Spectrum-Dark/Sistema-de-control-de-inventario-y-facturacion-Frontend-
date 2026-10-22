import { peticion } from "../compartido/clienteApi";

export const listarMovimientos = () => peticion("/inventario/movimientos/listar");