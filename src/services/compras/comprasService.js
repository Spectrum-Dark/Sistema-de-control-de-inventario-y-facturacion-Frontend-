import { peticion } from "../compartido/clienteApi";

export const listarCompras = () => peticion("/compras/listar");

export const registrarCompra = (datos) =>
  peticion("/compras/registrar", { metodo: "POST", cuerpo: datos });

export const confirmarCompra = (id) =>
  peticion(`/compras/confirmar/${id}`, { metodo: "POST" });

export const corregirCompra = (id, datos) =>
  peticion(`/compras/corregir/${id}`, { metodo: "PUT", cuerpo: datos });