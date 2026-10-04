import { Link, useLocation } from "react-router-dom";

// Diccionario que mapea los fragmentos de la URL (slugs) a nombres amigables para el usuario
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
  /* Obtiene la ruta/URL actual donde se encuentra el usuario */
  const ubicacion = useLocation();

  /* Divide la URL por las barras "/" y elimina elementos vacíos */
  const segmentos = ubicacion.pathname.split("/").filter(Boolean);

  /* Arreglo recortado omitiendo el primer nivel ("app") */
  const segmentosMigas = segmentos.slice(1);

  return (
    <nav aria-label="Migas de pan">
      {/* Enlace estático al inicio de la aplicación */}
      <Link to="/app/dashboard">Inicio</Link>

      {segmentosMigas.map((segmento, indice) => {
        /* Construye la URL acumulada para cada nivel */
        const ruta = "/" + segmentos.slice(0, indice + 2).join("/");

        /* Busca el nombre amigable en el diccionario o usa la palabra original */
        const nombre = nombresRutas[segmento] || segmento;

        /* Comprueba si el segmento actual es el último nivel de la miga de pan */
        const esUltimo = indice === segmentosMigas.length - 1;

        return (
          <span key={ruta}>
            {/* Separador visual */}
            {" / "}

            {/* Si es el último nivel, renderiza texto plano; si no, renderiza un enlace */}
            {esUltimo ? (
              <span aria-current="page">{nombre}</span>
            ) : (
              <Link to={ruta}>{nombre}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default MigasPan;
