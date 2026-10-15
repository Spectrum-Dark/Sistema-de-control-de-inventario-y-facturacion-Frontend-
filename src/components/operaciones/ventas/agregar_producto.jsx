import { useState, useRef, useEffect } from "react";

export default function Agregar_Producto({
  productos,
  idProductoSeleccionado,
  setIdProductoSeleccionado,
  agregarProducto,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const contenedorRef = useRef(null);

  // Cerrar el menú flotante al hacer clic fuera del contenedor
  useEffect(() => {
    function manejarClicFuera(evento) {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(evento.target)
      ) {
        setMostrarMenu(false);
      }
    }
    document.addEventListener("mousedown", manejarClicFuera);
    return () => document.removeEventListener("mousedown", manejarClicFuera);
  }, []);

  // Filtrar productos por coincidencia y limitar a máximo 20 resultados
  const productosFiltrados = productos
    .filter((producto) => {
      const termino = busqueda.toLowerCase().trim();
      return (
        producto.codigo_producto.toLowerCase().includes(termino) ||
        producto.nombre.toLowerCase().includes(termino)
      );
    })
    .slice(0, 20);

  const seleccionarProducto = (producto) => {
    if (producto.existencia_actual <= 0) return;
    setIdProductoSeleccionado(producto.id_producto);
    setBusqueda(`${producto.codigo_producto} - ${producto.nombre}`);
    setMostrarMenu(false);
  };

  const manejarBotonAgregar = () => {
    const agregado = agregarProducto();

    if (agregado) {
      setBusqueda("");
    }
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
        Agregar productos
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        {/* BUSCADOR AUTOCOMPLETABLE */}
        <div ref={contenedorRef} className="relative flex-1">
          <label
            htmlFor="buscar_producto"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Buscar o Seleccionar Producto
          </label>

          <div className="relative mt-1.5">
            <input
              id="buscar_producto"
              type="text"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                if (idProductoSeleccionado) setIdProductoSeleccionado("");
                setMostrarMenu(true);
              }}
              onFocus={() => setMostrarMenu(true)}
              placeholder="Escribe el código o nombre del repuesto..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 pr-10 text-xs text-slate-800 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />

            {/* Ícono buscador */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* DESPLEGABLE LIMITADO Y CON SCROLL */}
          {mostrarMenu && (
            <ul className="absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg text-xs [scrollbar-color:#cbd5e1_transparent] scrollbar-thin">
              {productosFiltrados.length === 0 ? (
                <li className="px-4 py-2.5 text-slate-400 italic">
                  No se encontraron productos coincidentes.
                </li>
              ) : (
                productosFiltrados.map((producto) => {
                  const estaAgotado = producto.existencia_actual <= 0;
                  const esSeleccionado =
                    Number(idProductoSeleccionado) === producto.id_producto;

                  return (
                    <li
                      key={producto.id_producto}
                      onClick={() => seleccionarProducto(producto)}
                      className={`flex items-center justify-between px-4 py-2.5 transition ${
                        estaAgotado
                          ? "opacity-50 cursor-not-allowed bg-slate-50"
                          : esSeleccionado
                            ? "bg-blue-50 font-bold text-blue-700 cursor-pointer"
                            : "hover:bg-slate-50 cursor-pointer text-slate-700"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {producto.codigo_producto} - {producto.nombre}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Precio: C$ {Number(producto.precio_venta).toFixed(2)}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-bold ${
                          estaAgotado ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {estaAgotado
                          ? "Agotado"
                          : `${producto.existencia_actual} disp.`}
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>

        {/* BOTÓN DE AGREGAR */}
        <button
          type="button"
          onClick={manejarBotonAgregar}
          className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Agregar producto
        </button>
      </div>
    </section>
  );
}
