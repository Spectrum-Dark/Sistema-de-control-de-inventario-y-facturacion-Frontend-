import { useState } from "react";

function useCompatibilidades() {
  // =====================================================
  // 1. ESTADOS DE BÚSQUEDA Y FILTROS
  // =====================================================

  const [busqueda, setBusqueda] = useState("");
  const [marcaSeleccionadaFiltro, setMarcaSeleccionadaFiltro] = useState("");
  const [modeloSeleccionadoFiltro, setModeloSeleccionadoFiltro] = useState("");

  // =====================================================
  // 2. ESTADOS DE PAGINACIÓN
  // =====================================================

  const [paginaActual, setPaginaActual] = useState(1);

  // ----------------------------------------------------
  // CONFIGURACIÓN DE ELEMENTOS POR PÁGINA
  // Ajusta este valor para determinar la cantidad de
  // compatibilidades visibles por página en la tabla.
  // ----------------------------------------------------
  const elementosPorPagina = 10;

  // =====================================================
  // 3. ESTADOS DEL FORMULARIO Y EDICIÓN
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [compatibilidadEditando, setCompatibilidadEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    id_producto: "",
    id_marca: "",
    id_modelo: "",
  });

  // =====================================================
  // 4. ESTADO PARA CONSULTAR DETALLE
  // =====================================================

  const [compatibilidadSeleccionada, setCompatibilidadSeleccionada] =
    useState(null);

  // =====================================================
  // 5. DATOS TEMPORALES (PRUEBA CON +10 REGISTROS)
  // =====================================================

  const productos = [
    { id_producto: 1, codigo_producto: "FIL-001", nombre: "Filtro de aceite" },
    {
      id_producto: 2,
      codigo_producto: "PAS-001",
      nombre: "Pastillas de freno delanteras",
    },
    { id_producto: 3, codigo_producto: "BUJ-001", nombre: "Bujías NGK" },
    { id_producto: 4, codigo_producto: "FIL-002", nombre: "Filtro de aire" },
    {
      id_producto: 5,
      codigo_producto: "DIS-001",
      nombre: "Disco de freno ventilado",
    },
    {
      id_producto: 6,
      codigo_producto: "AMO-001",
      nombre: "Amortiguador delantero",
    },
  ];

  const marcas = [
    { id_marca: 1, nombre: "Toyota" },
    { id_marca: 2, nombre: "Nissan" },
    { id_marca: 3, nombre: "Honda" },
    { id_marca: 4, nombre: "Hyundai" },
    { id_marca: 5, nombre: "Kia" },
  ];

  const modelos = [
    { id_modelo: 1, id_marca: 1, nombre: "Corolla" },
    { id_modelo: 2, id_marca: 1, nombre: "Hilux" },
    { id_modelo: 3, id_marca: 1, nombre: "Yaris" },
    { id_modelo: 4, id_marca: 2, nombre: "Sentra" },
    { id_modelo: 5, id_marca: 2, nombre: "Frontier" },
    { id_modelo: 6, id_marca: 3, nombre: "Civic" },
    { id_modelo: 7, id_marca: 3, nombre: "CR-V" },
    { id_modelo: 8, id_marca: 4, nombre: "Tucson" },
    { id_modelo: 9, id_marca: 5, nombre: "Sportage" },
  ];

  const compatibilidades = [
    {
      id_compatibilidad: 1,
      id_producto: 1,
      producto: "Filtro de aceite",
      id_marca: 1,
      marca: "Toyota",
      id_modelo: 1,
      modelo: "Corolla",
    },
    {
      id_compatibilidad: 2,
      id_producto: 1,
      producto: "Filtro de aceite",
      id_marca: 1,
      marca: "Toyota",
      id_modelo: 2,
      modelo: "Hilux",
    },
    {
      id_compatibilidad: 3,
      id_producto: 2,
      producto: "Pastillas de freno delanteras",
      id_marca: 2,
      marca: "Nissan",
      id_modelo: 4,
      modelo: "Sentra",
    },
    {
      id_compatibilidad: 4,
      id_producto: 3,
      producto: "Bujías NGK",
      id_marca: 3,
      marca: "Honda",
      id_modelo: 6,
      modelo: "Civic",
    },
    {
      id_compatibilidad: 5,
      id_producto: 4,
      producto: "Filtro de aire",
      id_marca: 1,
      marca: "Toyota",
      id_modelo: 3,
      modelo: "Yaris",
    },
    {
      id_compatibilidad: 6,
      id_producto: 5,
      producto: "Disco de freno ventilado",
      id_marca: 2,
      marca: "Nissan",
      id_modelo: 5,
      modelo: "Frontier",
    },
    {
      id_compatibilidad: 7,
      id_producto: 6,
      producto: "Amortiguador delantero",
      id_marca: 3,
      marca: "Honda",
      id_modelo: 7,
      modelo: "CR-V",
    },
    {
      id_compatibilidad: 8,
      id_producto: 1,
      producto: "Filtro de aceite",
      id_marca: 4,
      marca: "Hyundai",
      id_modelo: 8,
      modelo: "Tucson",
    },
    {
      id_compatibilidad: 9,
      id_producto: 3,
      producto: "Bujías NGK",
      id_marca: 5,
      marca: "Kia",
      id_modelo: 9,
      modelo: "Sportage",
    },
    {
      id_compatibilidad: 10,
      id_producto: 2,
      producto: "Pastillas de freno delanteras",
      id_marca: 1,
      marca: "Toyota",
      id_modelo: 1,
      modelo: "Corolla",
    },
    {
      id_compatibilidad: 11,
      id_producto: 4,
      producto: "Filtro de aire",
      id_marca: 2,
      marca: "Nissan",
      id_modelo: 4,
      modelo: "Sentra",
    },
    {
      id_compatibilidad: 12,
      id_producto: 5,
      producto: "Disco de freno ventilado",
      id_marca: 3,
      marca: "Honda",
      id_modelo: 6,
      modelo: "Civic",
    },
  ];

  // =====================================================
  // 6. CONTROL Y LIMPIEZA DEL FORMULARIO
  // =====================================================

  const limpiarFormulario = () => {
    setFormulario({
      id_producto: "",
      id_marca: "",
      id_modelo: "",
    });
    setModoEdicion(false);
    setCompatibilidadEditando(null);
  };

  const alternarFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario((estadoActual) => !estadoActual);
  };

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    if (name === "id_marca") {
      setFormulario((datosActuales) => ({
        ...datosActuales,
        id_marca: value,
        id_modelo: "",
      }));
    } else {
      setFormulario((datosActuales) => ({
        ...datosActuales,
        [name]: value,
      }));
    }
  };

  // =====================================================
  // 7. CONSULTAR DETALLE
  // =====================================================

  const verCompatibilidad = (compatibilidad) => {
    setCompatibilidadSeleccionada(compatibilidad);
  };

  const cerrarDetalle = () => {
    setCompatibilidadSeleccionada(null);
  };

  // =====================================================
  // 8. PREPARAR EDICIÓN
  // =====================================================

  const editarCompatibilidad = (compatibilidad) => {
    setModoEdicion(true);
    setCompatibilidadEditando(compatibilidad);

    setFormulario({
      id_producto: compatibilidad.id_producto ?? "",
      id_marca: compatibilidad.id_marca ?? "",
      id_modelo: compatibilidad.id_modelo ?? "",
    });

    setMostrarFormulario(true);
  };

  // =====================================================
  // 9. REGISTRAR O EDITAR COMPATIBILIDAD
  // =====================================================

  const registrarCompatibilidad = (evento) => {
    evento.preventDefault();

    if (!formulario.id_producto) {
      console.log("Debe seleccionar un producto.");
      return;
    }

    if (!formulario.id_marca) {
      console.log("Debe seleccionar una marca.");
      return;
    }

    if (!formulario.id_modelo) {
      console.log("Debe seleccionar un modelo.");
      return;
    }

    const modeloSeleccionado = modelos.find(
      (m) => m.id_modelo === Number(formulario.id_modelo),
    );

    if (
      !modeloSeleccionado ||
      modeloSeleccionado.id_marca !== Number(formulario.id_marca)
    ) {
      console.log("El modelo seleccionado no pertenece a la marca indicada.");
      return;
    }

    const datosCompatibilidad = {
      id_producto: Number(formulario.id_producto),
      id_marca: Number(formulario.id_marca),
      id_modelo: Number(formulario.id_modelo),
    };

    if (modoEdicion) {
      console.log("Actualización de compatibilidad:", {
        id_compatibilidad: compatibilidadEditando.id_compatibilidad,
        ...datosCompatibilidad,
      });
    } else {
      console.log("Registro de compatibilidad:", datosCompatibilidad);
    }

    limpiarFormulario();
    setMostrarFormulario(false);
  };

  // =====================================================
  // 10. ELIMINAR COMPATIBILIDAD
  // =====================================================

  const eliminarCompatibilidad = (compatibilidad) => {
    console.log("Eliminar compatibilidad:", {
      id_compatibilidad: compatibilidad.id_compatibilidad,
    });
  };

  // =====================================================
  // 11. MODELOS DISPONIBLES
  // =====================================================

  const modelosDisponibles = modelos.filter(
    (modelo) => modelo.id_marca === Number(formulario.id_marca),
  );

  const modelosDisponiblesFiltro = modelos.filter(
    (modelo) =>
      marcaSeleccionadaFiltro === "" ||
      modelo.id_marca === Number(marcaSeleccionadaFiltro),
  );

  // =====================================================
  // 12. BÚSQUEDA Y FILTRADO
  // =====================================================

  const textoBusqueda = busqueda
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const compatibilidadesFiltradas = compatibilidades.filter((item) => {
    const producto = item.producto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const marca = item.marca
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const modelo = item.modelo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const coincideBusqueda =
      producto.includes(textoBusqueda) ||
      marca.includes(textoBusqueda) ||
      modelo.includes(textoBusqueda);

    const coincideMarca =
      marcaSeleccionadaFiltro === "" ||
      item.id_marca === Number(marcaSeleccionadaFiltro);

    const coincideModelo =
      modeloSeleccionadoFiltro === "" ||
      item.id_modelo === Number(modeloSeleccionadoFiltro);

    return coincideBusqueda && coincideMarca && coincideModelo;
  });

  // =====================================================
  // 13. CÁLCULO DE PAGINACIÓN (.slice)
  // =====================================================

  const totalPaginas =
    Math.ceil(compatibilidadesFiltradas.length / elementosPorPagina) || 1;

  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;

  const compatibilidadesPaginadas = compatibilidadesFiltradas.slice(
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

  const manejarFiltroMarca = (valor) => {
    setMarcaSeleccionadaFiltro(valor);
    setModeloSeleccionadoFiltro("");
    setPaginaActual(1);
  };

  const manejarFiltroModelo = (valor) => {
    setModeloSeleccionadoFiltro(valor);
    setPaginaActual(1);
  };

  // =====================================================
  // 14. EXPORTACIÓN DE ESTADOS Y MÉTODOS
  // =====================================================

  return {
    productos,
    marcas,
    modelos,
    compatibilidades,
    compatibilidadesFiltradas,
    compatibilidadesPaginadas,

    // Paginación
    paginaActual,
    totalPaginas,
    paginaSiguiente,
    paginaAnterior,
    totalRegistros: compatibilidadesFiltradas.length,

    // Filtros
    busqueda,
    setBusqueda: manejarBusqueda,
    marcaSeleccionadaFiltro,
    setMarcaSeleccionadaFiltro: manejarFiltroMarca,
    modeloSeleccionadoFiltro,
    setModeloSeleccionadoFiltro: manejarFiltroModelo,
    modelosDisponiblesFiltro,

    // Formulario
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,
    modelosDisponibles,

    // Operaciones CRUD
    registrarCompatibilidad,
    editarCompatibilidad,
    modoEdicion,
    eliminarCompatibilidad,

    // Detalle
    compatibilidadSeleccionada,
    verCompatibilidad,
    cerrarDetalle,
  };
}

export default useCompatibilidades;
