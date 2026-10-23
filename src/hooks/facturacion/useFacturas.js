import { useListado } from "../compartido/useListado";
import { listarFacturas } from "../../services/facturacion/facturasService";

export function useFacturas() {
  const { datos, cargando, error, recargar } = useListado(listarFacturas, "id_factura");
  return { facturas: datos, cargando, error, recargar };
}
