import { peticion } from "../compartido/clienteApi";

export const listarVentas = () => peticion("/ventas/listar");
export const registrarVenta = (datos) =>
  peticion("/ventas/registrar", { metodo: "POST", cuerpo: datos });
export const confirmarVenta = (id) =>
  peticion(`/ventas/confirmar/${id}`, { metodo: "POST" });
export const corregirVenta = (id, datos) =>
  peticion(`/ventas/corregir/${id}`, { metodo: "PUT", cuerpo: datos });
export const anularVenta = (id, datos) =>
  peticion(`/ventas/anular/${id}`, { metodo: "PUT", cuerpo: datos });
