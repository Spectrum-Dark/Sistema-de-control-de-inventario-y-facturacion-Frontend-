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

  return (
    <nav
      aria-label="Migas de pan"
      className="mb-6 flex flex-wrap items-center text-sm text-slate-500"
    >
      {/* "Inicio" como texto plano */}
      <span className="font-medium text-slate-500">
        Inicio
      </span>

      {segmentosMigas.map((segmento, indice) => {
        const ruta = "/" + segmentos.slice(0, indice + 2).join("/");
        const nombre = nombresRutas[segmento] || segmento;
        const esUltimo = indice === segmentosMigas.length - 1;

        return (
          <span key={ruta} className="inline-flex items-center">
            {/* Separador visual */}
            <span className="mx-2 text-slate-300">/</span>

            {/* Texto plano (con resaltado solo en la última sección) */}
            <span
              className={
                esUltimo
                  ? "font-semibold text-slate-900"
                  : "text-slate-500"
              }
              {...(esUltimo ? { "aria-current": "page" } : {})}
            >
              {nombre}
            </span>
          </span>
        );
      })}
    </nav>
  );
}

export default MigasPan;