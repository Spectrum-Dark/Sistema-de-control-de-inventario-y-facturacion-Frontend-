import { useState } from "react";

function useCategorias() {
  // =====================================================
  // 1. ESTADO DE BÚSQUEDA
  // =====================================================

  const [busqueda, setBusqueda] = useState("");

  // =====================================================
  // 2. ESTADOS DE PAGINACIÓN
  // =====================================================

  const [paginaActual, setPaginaActual] = useState(1);

  // ----------------------------------------------------
  // CONFIGURACIÓN DE ELEMENTOS POR PÁGINA
  // Modifica este valor (ej. 5, 10, 15) para ajustar
  // la cantidad de categorías visibles por página.
  // ----------------------------------------------------
  const elementosPorPagina = 10;

  // =====================================================
  // 3. ESTADOS DEL FORMULARIO Y EDICIÓN
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
  });

  // =====================================================
  // 4. ESTADO PARA CONSULTAR DETALLE
  // =====================================================

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // =====================================================
  // 5. DATOS TEMPORALES (PRUEBA)
  // =====================================================

  const categorias = [
    {
      id_categoria: 1,
      nombre: "Motor",
      descripcion:
        "Repuestos relacionados con el bloque del motor, pistones y componentes internos.",
    },
    {
      id_categoria: 2,
      nombre: "Frenos",
      descripcion:
        "Pastillas, discos, tambores y mangueras para el sistema de frenado.",
    },
    {
      id_categoria: 3,
      nombre: "Suspensión",
      descripcion: "Amortiguadores, espirales, tijeras y bujes de dirección.",
    },
    {
      id_categoria: 4,
      nombre: "Eléctrico",
      descripcion:
        "Baterías, alternadores, arrancadores y arneses de iluminación.",
    },
    {
      id_categoria: 5,
      nombre: "Filtros",
      descripcion:
        "Filtros de aceite, aire, combustible y cabina para mantenimiento periódico.",
    },
    {
      id_categoria: 6,
      nombre: "Transmisión",
      descripcion:
        "Kits de embrague, cajas de cambio, ejes y juntas homocinéticas.",
    },
    {
      id_categoria: 7,
      nombre: "Refrigeración",
      descripcion:
        "Radiadores, bombas de agua, mangueras y termostatos del motor.",
    },
    {
      id_categoria: 8,
      nombre: "Escape",
      descripcion:
        "Sistemas de escape, silenciadores, catalizadores y sensores de oxígeno.",
    },
    {
      id_categoria: 9,
      nombre: "Carrocería",
      descripcion:
        "Espejos, silvines, parachoques y piezas plásticas de exterior.",
    },
    {
      id_categoria: 10,
      nombre: "Climatización",
      descripcion: "Compresores de A/C, condensadores y evapoaradores.",
    },
    {
      id_categoria: 11,
      nombre: "Inyección",
      descripcion:
        "Inyectores de combustible, rieles de inyección y bombas de alta presión.",
    },
    {
      id_categoria: 12,
      nombre: "Lubricantes",
      descripcion:
        "Aceites sintéticos, semi-sintéticos y aditivos para motor y transmisión.",
    },
  ];

  // =====================================================
  // 6. CONTROL Y LIMPIEZA DEL FORMULARIO
  // =====================================================

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      descripcion: "",
    });
    setModoEdicion(false);
    setCategoriaEditando(null);
  };

  const alternarFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario((estadoActual) => !estadoActual);
  };

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));
  };

  // =====================================================
  // 7. CONSULTAR DETALLE
  // =====================================================

  const verCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const cerrarDetalle = () => {
    setCategoriaSeleccionada(null);
  };

  // =====================================================
  // 8. PREPARAR EDICIÓN
  // =====================================================

  const editarCategoria = (categoria) => {
    setModoEdicion(true);
    setCategoriaEditando(categoria);

    setFormulario({
      nombre: categoria.nombre ?? "",
      descripcion: categoria.descripcion ?? "",
    });

    setMostrarFormulario(true);
  };

  // =====================================================
  // 9. REGISTRAR O EDITAR CATEGORÍA
  // =====================================================

  const registrarCategoria = (evento) => {
    evento.preventDefault();

    if (!formulario.nombre.trim()) {
      console.log("El nombre de la categoría es obligatorio.");
      return;
    }

    const datosCategoria = {
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
    };

    if (modoEdicion) {
      console.log("Actualización de categoría:", {
        id_categoria: categoriaEditando.id_categoria,
        ...datosCategoria,
      });
    } else {
      console.log("Registro de categoría:", datosCategoria);
    }

    limpiarFormulario();
    setMostrarFormulario(false);
  };

  // =====================================================
  // 10. ELIMINAR CATEGORÍA
  // =====================================================

  const eliminarCategoria = (categoria) => {
    console.log("Eliminar categoría:", {
      id_categoria: categoria.id_categoria,
    });
  };

  // =====================================================
  // 11. BÚSQUEDA Y FILTRADO
  // =====================================================

  const textoBusqueda = busqueda
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const categoriasFiltradas = categorias.filter((categoria) => {
    const nombre = categoria.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const descripcion = (categoria.descripcion ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return (
      nombre.includes(textoBusqueda) || descripcion.includes(textoBusqueda)
    );
  });

  // =====================================================
  // 12. CÁLCULO DE PAGINACIÓN (.slice)
  // =====================================================

  const totalPaginas =
    Math.ceil(categoriasFiltradas.length / elementosPorPagina) || 1;

  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;

  const categoriasPaginadas = categoriasFiltradas.slice(
    indiceInicial,
    indiceFinal,
  );

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual((prev) => prev + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual((prev) => prev - 1);
  };

  const manejarBusqueda = (valor) => {
    setBusqueda(valor);
    setPaginaActual(1);
  };

  // =====================================================
  // 13. EXPORTACIÓN DE ESTADOS Y MÉTODOS
  // =====================================================

  return {
    categorias,
    categoriasFiltradas,
    categoriasPaginadas,

    // Control de Paginación
    paginaActual,
    totalPaginas,
    paginaSiguiente,
    paginaAnterior,
    totalRegistros: categoriasFiltradas.length,

    // Búsqueda
    busqueda,
    setBusqueda: manejarBusqueda,

    // Formulario
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,

    // Operaciones CRUD
    registrarCategoria,
    editarCategoria,
    modoEdicion,
    eliminarCategoria,

    // Detalle
    categoriaSeleccionada,
    verCategoria,
    cerrarDetalle,
  };
}

export default useCategorias;
