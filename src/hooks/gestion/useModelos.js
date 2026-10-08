import { useState } from "react";

function useModelos() {
  // =====================================================
  // 1. ESTADOS DE BÚSQUEDA Y FILTROS
  // =====================================================

  const [busqueda, setBusqueda] = useState("");
  const [marcaSeleccionadaFiltro, setMarcaSeleccionadaFiltro] = useState("");

  // =====================================================
  // 2. ESTADOS DE PAGINACIÓN
  // =====================================================

  const [paginaActual, setPaginaActual] = useState(1);

  // ----------------------------------------------------
  // CONFIGURACIÓN DE ELEMENTOS POR PÁGINA
  // Cambia este número para ajustar la cantidad de
  // modelos visibles por página en la tabla.
  // ----------------------------------------------------
  const elementosPorPagina = 10;

  // =====================================================
  // 3. ESTADOS DEL FORMULARIO Y EDICIÓN
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modeloEditando, setModeloEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    id_marca: "",
    nombre: "",
  });

  // =====================================================
  // 4. ESTADO PARA CONSULTAR DETALLE
  // =====================================================

  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

  // =====================================================
  // 5. DATOS TEMPORALES (PRUEBA CON +10 REGISTROS)
  // =====================================================

  const modelos = [
    { id_modelo: 1, id_marca: 1, marca: "Toyota", nombre: "Corolla" },
    { id_modelo: 2, id_marca: 1, marca: "Toyota", nombre: "Hilux" },
    { id_modelo: 3, id_marca: 1, marca: "Toyota", nombre: "Yaris" },
    { id_modelo: 4, id_marca: 1, marca: "Toyota", nombre: "RAV4" },
    { id_modelo: 5, id_marca: 2, marca: "Nissan", nombre: "Sentra" },
    { id_modelo: 6, id_marca: 2, marca: "Nissan", nombre: "Frontier" },
    { id_modelo: 7, id_marca: 2, marca: "Nissan", nombre: "Versa" },
    { id_modelo: 8, id_marca: 3, marca: "Honda", nombre: "Civic" },
    { id_modelo: 9, id_marca: 3, marca: "Honda", nombre: "CR-V" },
    { id_modelo: 10, id_marca: 3, marca: "Honda", nombre: "Accord" },
    { id_modelo: 11, id_marca: 4, marca: "Hyundai", nombre: "Tucson" },
    { id_modelo: 12, id_marca: 4, marca: "Hyundai", nombre: "Elantra" },
    { id_modelo: 13, id_marca: 5, marca: "Kia", nombre: "Sportage" },
    { id_modelo: 14, id_marca: 5, marca: "Kia", nombre: "Rio" },
  ];

  const marcas = [
    { id_marca: 1, nombre: "Toyota" },
    { id_marca: 2, nombre: "Nissan" },
    { id_marca: 3, nombre: "Honda" },
    { id_marca: 4, nombre: "Hyundai" },
    { id_marca: 5, nombre: "Kia" },
  ];

  // =====================================================
  // 6. CONTROL Y LIMPIEZA DEL FORMULARIO
  // =====================================================

  const limpiarFormulario = () => {
    setFormulario({
      id_marca: "",
      nombre: "",
    });
    setModoEdicion(false);
    setModeloEditando(null);
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

  const verModelo = (modelo) => {
    setModeloSeleccionado(modelo);
  };

  const cerrarDetalle = () => {
    setModeloSeleccionado(null);
  };

  // =====================================================
  // 8. PREPARAR EDICIÓN
  // =====================================================

  const editarModelo = (modelo) => {
    setModoEdicion(true);
    setModeloEditando(modelo);

    setFormulario({
      id_marca: modelo.id_marca ?? "",
      nombre: modelo.nombre ?? "",
    });

    setMostrarFormulario(true);
  };

  // =====================================================
  // 9. REGISTRAR O EDITAR MODELO
  // =====================================================

  const registrarModelo = (evento) => {
    evento.preventDefault();

    if (!formulario.id_marca) {
      console.log("Debe seleccionar una marca.");
      return;
    }

    if (!formulario.nombre.trim()) {
      console.log("El nombre del modelo es obligatorio.");
      return;
    }

    const datosModelo = {
      id_marca: Number(formulario.id_marca),
      nombre: formulario.nombre.trim(),
    };

    if (modoEdicion) {
      console.log("Actualización de modelo:", {
        id_modelo: modeloEditando.id_modelo,
        ...datosModelo,
      });
    } else {
      console.log("Registro de modelo:", datosModelo);
    }

    limpiarFormulario();
    setMostrarFormulario(false);
  };

  // =====================================================
  // 10. ELIMINAR MODELO
  // =====================================================

  const eliminarModelo = (modelo) => {
    console.log("Eliminar modelo:", {
      id_modelo: modelo.id_modelo,
    });
  };

  // =====================================================
  // 11. BÚSQUEDA Y FILTRADO
  // =====================================================

  const textoBusqueda = busqueda
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const modelosFiltrados = modelos.filter((modelo) => {
    const nombre = modelo.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const marca = modelo.marca
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const coincideBusqueda =
      nombre.includes(textoBusqueda) || marca.includes(textoBusqueda);

    const coincideMarca =
      marcaSeleccionadaFiltro === "" ||
      modelo.id_marca === Number(marcaSeleccionadaFiltro);

    return coincideBusqueda && coincideMarca;
  });

  // =====================================================
  // 12. CÁLCULO DE PAGINACIÓN (.slice)
  // =====================================================

  const totalPaginas =
    Math.ceil(modelosFiltrados.length / elementosPorPagina) || 1;

  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;

  const modelosPaginados = modelosFiltrados.slice(indiceInicial, indiceFinal);

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
    setPaginaActual(1);
  };

  // =====================================================
  // 13. EXPORTACIÓN DE ESTADOS Y MÉTODOS
  // =====================================================

  return {
    modelos,
    modelosFiltrados,
    modelosPaginados,
    marcas,

    // Control de Paginación
    paginaActual,
    totalPaginas,
    paginaSiguiente,
    paginaAnterior,
    totalRegistros: modelosFiltrados.length,

    // Filtros
    busqueda,
    setBusqueda: manejarBusqueda,
    marcaSeleccionadaFiltro,
    setMarcaSeleccionadaFiltro: manejarFiltroMarca,

    // Formulario
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,

    // Operaciones CRUD
    registrarModelo,
    editarModelo,
    modoEdicion,
    eliminarModelo,

    // Detalle
    modeloSeleccionado,
    verModelo,
    cerrarDetalle,
  };
}

export default useModelos;
