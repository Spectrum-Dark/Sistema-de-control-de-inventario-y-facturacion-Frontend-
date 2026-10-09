import { useEffect, useState } from "react";
import useFacturas from "../../hooks/facturacion/useFacturas";
import Filtros_Facturas from "../../components/facturacion/factura/filtros_facturas";
import Tabla_Facturas from "../../components/facturacion/factura/tabla_facturas";
import Detalle_Factura_Panel from "../../components/facturacion/factura/detalle_factura_panel";
import VistaVoucher from "../../components/facturacion/voucher/vista_voucher";

/**
 * Vista principal del módulo de Facturación.
 */
export default function Facturas() {
  const {
    facturas,
    totalRegistros,
    paginaActual,
    totalPaginas,
    busqueda,
    fechaDesde,
    fechaHasta,
    facturaSeleccionada,
    setBusqueda,
    setFechaDesde,
    setFechaHasta,
    consultarFactura,
    limpiarFiltros,
    cambiarPagina,
  } = useFacturas();

  const [formatoImpresion, setFormatoImpresion] = useState("58mm");

  function imprimirConFormato() {
    if (!facturaSeleccionada) return;

    document.body.classList.remove("print-factura");
    document.body.classList.add("print-voucher");

    window.print();
  }

  useEffect(() => {
    function limpiarModoImpresion() {
      document.body.classList.remove("print-voucher", "print-factura");
    }

    window.addEventListener("afterprint", limpiarModoImpresion);

    return () => {
      window.removeEventListener("afterprint", limpiarModoImpresion);
      limpiarModoImpresion();
    };
  }, []);

  return (
    <main className="space-y-6">
      {/* Encabezado del módulo */}
      <div className="print:hidden">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Facturación
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Consulta las facturas asociadas a las ventas registradas.
        </p>
      </div>

      {/* Búsqueda y filtros */}
      <Filtros_Facturas
        busqueda={busqueda}
        fechaDesde={fechaDesde}
        fechaHasta={fechaHasta}
        setBusqueda={setBusqueda}
        setFechaDesde={setFechaDesde}
        setFechaHasta={setFechaHasta}
        limpiarFiltros={limpiarFiltros}
      />

      {/* Listado con paginación */}
      <Tabla_Facturas
        facturas={facturas}
        totalRegistros={totalRegistros}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        consultarFactura={consultarFactura}
        cambiarPagina={cambiarPagina}
      />

      {/* Detalle de la factura seleccionada */}
      <Detalle_Factura_Panel
        facturaSeleccionada={facturaSeleccionada}
        formatoImpresion={formatoImpresion}
        setFormatoImpresion={setFormatoImpresion}
        consultarFactura={consultarFactura}
        imprimirConFormato={imprimirConFormato}
      />

      {/* Elemento imprimible del voucher */}
      <VistaVoucher factura={facturaSeleccionada} formato={formatoImpresion} />
    </main>
  );
}
