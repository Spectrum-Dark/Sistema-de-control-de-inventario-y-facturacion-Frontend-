import { useLocation } from "react-router-dom";

const nombresRutas = {
  gestion: "Gestión",
  productos: "Productos",
  categorias: "Categorías",
  marcas: "Marcas",
  modelos: "Modelos",
  compatibilidades: "Compatibilidades",
  proveedores: "Proveedores",
  clientes: "Clientes",

  operaciones: "Operaciones",
  compras: "Compras",
  inventario: "Inventario",
  ventas: "Ventas",

  facturacion: "Facturación",
  facturas: "Facturas",

  reportes: "Reportes",

  administracion: "Administración",
  usuarios: "Usuarios",
  "roles-permisos": "Roles y permisos",
  respaldo: "Respaldo",
};

function MigasPan() {
  const ubicacion = useLocation();

  const segmentos = ubicacion.pathname.split("/").filter(Boolean);
  const segmentosMigas = segmentos.slice(1);

  // Obtener el nombre del último segmento para vista móvil ultra-compacta
  const ultimoSegmento = segmentosMigas[segmentosMigas.length - 1];
  const nombreUltimo =
    nombresRutas[ultimoSegmento] || ultimoSegmento || "Inicio";

  return (
    <nav
      aria-label="Migas de pan"
      className="flex min-w-0 items-center text-xs sm:text-sm text-slate-500"
    >
      {/* VISTA MÓVIL (Muestra solo la ubicación actual para no romper el espacio) */}
      <div className="flex items-center gap-1.5 sm:hidden min-w-0">
        <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600"></span>
        <span className="truncate font-bold text-slate-900 text-xs">
          {nombreUltimo}
        </span>
      </div>

      {/* VISTA ESCRITORIO / TABLET (Ruta completa responsiva) */}
      <div className="hidden sm:flex sm:items-center sm:whitespace-nowrap overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* "Inicio" */}
        <span className="font-medium text-slate-400 hover:text-slate-600 transition">
          Inicio
        </span>

        {segmentosMigas.map((segmento, indice) => {
          const ruta = "/" + segmentos.slice(0, indice + 2).join("/");
          const nombre = nombresRutas[segmento] || segmento;
          const esUltimo = indice === segmentosMigas.length - 1;

          return (
            <span key={ruta} className="inline-flex items-center shrink-0">
              {/* Separador visual */}
              <span className="mx-2 text-slate-300">/</span>

              {/* Texto */}
              <span
                className={
                  esUltimo
                    ? "font-bold text-slate-900"
                    : "font-medium text-slate-500"
                }
                {...(esUltimo ? { "aria-current": "page" } : {})}
              >
                {nombre}
              </span>
            </span>
          );
        })}
      </div>
    </nav>
  );
}

export default MigasPan;
