import { peticion } from "../compartido/clienteApi";

export const listarFacturas = () => peticion("/facturas/listar");

export const mostrarFactura = (id) => peticion(`/facturas/mostrar/${id}`);

export const emitirFactura = (datos) =>
  peticion("/facturas/emitir", { metodo: "POST", cuerpo: datos });

export const anularFactura = (id, datos) =>
  peticion(`/facturas/anular/${id}`, { metodo: "PUT", cuerpo: datos });
