import { useState } from "react";

function useMarcas() {
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
  // Ajusta este número para cambiar cuántas marcas se
  // muestran por cada página en la tabla.
  // ----------------------------------------------------
  const elementosPorPagina = 10;

  // =====================================================
  // 3. ESTADOS DEL FORMULARIO Y EDICIÓN
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [marcaEditando, setMarcaEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
  });

  // =====================================================
  // 4. ESTADO PARA CONSULTAR DETALLE
  // =====================================================

  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  // =====================================================
  // 5. DATOS TEMPORALES (PRUEBA CON MÁS DE 10 REGISTROS)
  // =====================================================

  const marcas = [
    {
      id_marca: 1,
      nombre: "Toyota",
      descripcion:
        "Fabricante japonés de vehículos comerciales y de pasajeros.",
    },
    {
      id_marca: 2,
      nombre: "Nissan",
      descripcion:
        "Marca japonesa especializada en sedan, camionetas y repuestos.",
    },
    {
      id_marca: 3,
      nombre: "Honda",
      descripcion:
        "Fabricante japonés conocido por motores de alta durabilidad.",
    },
    {
      id_marca: 4,
      nombre: "Hyundai",
      descripcion: "Marca surcoreana líder en vehículos compactos y SUV.",
    },
    {
      id_marca: 5,
      nombre: "Kia",
      descripcion: "Fabricante surcoreano de utilitarios y sedanes.",
    },
    {
      id_marca: 6,
      nombre: "Chevrolet",
      descripcion:
        "Marca estadounidense con amplia variedad de repuestos pesados.",
    },
    {
      id_marca: 7,
      nombre: "Ford",
      descripcion:
        "Fabricante estadounidense especializado en camionetas Pick-Up.",
    },
    {
      id_marca: 8,
      nombre: "Mitsubishi",
      descripcion: "Especialistas en vehículos 4x4 y sistemas de tracción.",
    },
    {
      id_marca: 9,
      nombre: "Suzuki",
      descripcion:
        "Marca japonesa especializada en vehículos subcompactos y SUV.",
    },
    {
      id_marca: 10,
      nombre: "Isuzu",
      descripcion: "Fabricante de motores diésel y camiones comerciales.",
    },
    {
      id_marca: 11,
      nombre: "Mazda",
      descripcion: "Fabricante japonés enfocado en diseño deportivo y confort.",
    },
    {
      id_marca: 12,
      nombre: "Volkswagen",
      descripcion: "Marca alemana con amplia presencia en repuestos de motor.",
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
    setMarcaEditando(null);
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

  const verMarca = (marca) => {
    setMarcaSeleccionada(marca);
  };

  const cerrarDetalle = () => {
    setMarcaSeleccionada(null);
  };

  // =====================================================
  // 8. PREPARAR EDICIÓN
  // =====================================================

  const editarMarca = (marca) => {
    setModoEdicion(true);
    setMarcaEditando(marca);

    setFormulario({
      nombre: marca.nombre ?? "",
      descripcion: marca.descripcion ?? "",
    });

    setMostrarFormulario(true);
  };

  // =====================================================
  // 9. REGISTRAR O EDITAR MARCA
  // =====================================================

  const registrarMarca = (evento) => {
    evento.preventDefault();

    if (!formulario.nombre.trim()) {
      console.log("El nombre de la marca es obligatorio.");
      return;
    }

    const datosMarca = {
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
    };

    if (modoEdicion) {
      console.log("Actualización de marca:", {
        id_marca: marcaEditando.id_marca,
        ...datosMarca,
      });
    } else {
      console.log("Registro de marca:", datosMarca);
    }

    limpiarFormulario();
    setMostrarFormulario(false);
  };

  // =====================================================
  // 10. ELIMINAR MARCA
  // =====================================================

  const eliminarMarca = (marca) => {
    console.log("Eliminar marca:", {
      id_marca: marca.id_marca,
    });
  };

  // =====================================================
  // 11. BÚSQUEDA Y FILTRADO
  // =====================================================

  const textoBusqueda = busqueda
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const marcasFiltradas = marcas.filter((marca) => {
    const nombre = marca.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const descripcion = (marca.descripcion ?? "")
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
    Math.ceil(marcasFiltradas.length / elementosPorPagina) || 1;

  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;

  const marcasPaginadas = marcasFiltradas.slice(indiceInicial, indiceFinal);

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
    marcas,
    marcasFiltradas,
    marcasPaginadas,

    // Control de Paginación
    paginaActual,
    totalPaginas,
    paginaSiguiente,
    paginaAnterior,
    totalRegistros: marcasFiltradas.length,

    // Búsqueda
    busqueda,
    setBusqueda: manejarBusqueda,

    // Formulario
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,

    // Operaciones CRUD
    registrarMarca,
    editarMarca,
    modoEdicion,
    eliminarMarca,

    // Detalle
    marcaSeleccionada,
    verMarca,
    cerrarDetalle,
  };
}

export default useMarcas;
