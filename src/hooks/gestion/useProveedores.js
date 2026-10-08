import { useState } from "react";

function useProveedores() {
  // =====================================================
  // 1. ESTADOS DE BÚSQUEDA
  // =====================================================

  const [busqueda, setBusqueda] = useState("");

  // =====================================================
  // 2. ESTADOS DE PAGINACIÓN
  // =====================================================

  const [paginaActual, setPaginaActual] = useState(1);

  // ----------------------------------------------------
  // CONFIGURACIÓN DE ELEMENTOS POR PÁGINA
  // Ajusta este valor para determinar la cantidad de
  // proveedores visibles por página en la tabla.
  // ----------------------------------------------------
  const elementosPorPagina = 10;

  // =====================================================
  // 3. ESTADOS DEL FORMULARIO Y EDICIÓN
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo_electronico: "",
    direccion: "",
    contacto: "",
  });

  // =====================================================
  // 4. ESTADO PARA CONSULTAR DETALLE
  // =====================================================

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  // =====================================================
  // 5. DATOS TEMPORALES (PRUEBA CON +10 REGISTROS)
  // =====================================================

  const proveedores = [
    {
      id_proveedor: 1,
      nombre: "Repuestos Automotrices del Norte",
      telefono: "2250-1001",
      correo_electronico: "ventas@norte.com",
      direccion: "Km 5 Carretera Norte, Managua",
      contacto: "Carlos López",
    },
    {
      id_proveedor: 2,
      nombre: "Distribuidora Japonesa",
      telefono: "2250-1002",
      correo_electronico: "ventas@japonesa.com",
      direccion: "Pista Suburbana, Managua",
      contacto: "María González",
    },
    {
      id_proveedor: 3,
      nombre: "Importadora Centroamericana",
      telefono: "2250-1003",
      correo_electronico: "contacto@importadora.com",
      direccion: "De la Iglesia SUTEC 2c al lago, León",
      contacto: "José Martínez",
    },
    {
      id_proveedor: 4,
      nombre: "Auto Repuestos Express",
      telefono: "2250-1004",
      correo_electronico: "ventas@express.com",
      direccion: "Avenida Central, Chinandega",
      contacto: "Ana Rodríguez",
    },
    {
      id_proveedor: 5,
      nombre: "Distribuciones del Pacífico",
      telefono: "2250-1005",
      correo_electronico: "info@pacifico.com",
      direccion: "Barrio San Luis, Managua",
      contacto: "Pedro Hernández",
    },
    {
      id_proveedor: 6,
      nombre: "Frenos y Partes de Nicaragua",
      telefono: "2250-1006",
      correo_electronico: "contacto@frenosnic.com",
      direccion: "Carretera a Masaya Km 8",
      contacto: "Sonia Gutiérrez",
    },
    {
      id_proveedor: 7,
      nombre: "Servicios e Importaciones Globales",
      telefono: "2250-1007",
      correo_electronico: "ventas@siglobal.com",
      direccion: "Zona Franca Las Mercedes",
      contacto: "Roberto Blandón",
    },
    {
      id_proveedor: 8,
      nombre: "Comercializadora Automotriz",
      telefono: "2250-1008",
      correo_electronico: "info@comauto.com",
      direccion: "El Redondel 1c abajo, Estelí",
      contacto: "Elena Torres",
    },
    {
      id_proveedor: 9,
      nombre: "Repuestos y Filtros del Sur",
      telefono: "2250-1009",
      correo_electronico: "ventas@filtrossur.com",
      direccion: "Mercado Municipal 3c al sur, Rivas",
      contacto: "Fernando Castillo",
    },
    {
      id_proveedor: 10,
      nombre: "Sistemas Eléctricos Automotrices",
      telefono: "2250-1010",
      correo_electronico: "contacto@selecauto.com",
      direccion: "Bello Horizonte, Managua",
      contacto: "Claudia Mendoza",
    },
    {
      id_proveedor: 11,
      nombre: "Importaciones Diesel & Gasolina",
      telefono: "2250-1011",
      correo_electronico: "ventas@idiesel.com",
      direccion: "Empalme de Tipitapa 500m al este",
      contacto: "Gabriel Ruiz",
    },
  ];

  // =====================================================
  // 6. CONTROL Y LIMPIEZA DEL FORMULARIO
  // =====================================================

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      telefono: "",
      correo_electronico: "",
      direccion: "",
      contacto: "",
    });
    setModoEdicion(false);
    setProveedorEditando(null);
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

  const verProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
  };

  const cerrarDetalle = () => {
    setProveedorSeleccionado(null);
  };

  // =====================================================
  // 8. PREPARAR EDICIÓN
  // =====================================================

  const editarProveedor = (proveedor) => {
    setModoEdicion(true);
    setProveedorEditando(proveedor);

    setFormulario({
      nombre: proveedor.nombre ?? "",
      telefono: proveedor.telefono ?? "",
      correo_electronico: proveedor.correo_electronico ?? "",
      direccion: proveedor.direccion ?? "",
      contacto: proveedor.contacto ?? "",
    });

    setMostrarFormulario(true);
  };

  // =====================================================
  // 9. REGISTRAR O EDITAR PROVEEDOR
  // =====================================================

  const registrarProveedor = (evento) => {
    evento.preventDefault();

    if (!formulario.nombre.trim()) {
      console.log("El nombre del proveedor es obligatorio.");
      return;
    }

    if (!formulario.telefono.trim()) {
      console.log("El teléfono del proveedor es obligatorio.");
      return;
    }

    if (!formulario.correo_electronico.trim()) {
      console.log("El correo electrónico del proveedor es obligatorio.");
      return;
    }

    const datosProveedor = {
      nombre: formulario.nombre.trim(),
      telefono: formulario.telefono.trim(),
      correo_electronico: formulario.correo_electronico.trim(),
      direccion: formulario.direccion.trim(),
      contacto: formulario.contacto.trim(),
    };

    if (modoEdicion) {
      console.log("Actualización de proveedor:", {
        id_proveedor: proveedorEditando.id_proveedor,
        ...datosProveedor,
      });
    } else {
      console.log("Registro de proveedor:", datosProveedor);
    }

    limpiarFormulario();
    setMostrarFormulario(false);
  };

  // =====================================================
  // 10. ELIMINAR PROVEEDOR
  // =====================================================

  const eliminarProveedor = (proveedor) => {
    console.log("Eliminar proveedor:", {
      id_proveedor: proveedor.id_proveedor,
    });
  };

  // =====================================================
  // 11. BÚSQUEDA Y FILTRADO
  // =====================================================

  const textoBusqueda = busqueda
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const proveedoresFiltrados = proveedores.filter((proveedor) => {
    const nombre = (proveedor.nombre ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const telefono = (proveedor.telefono ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const correo = (proveedor.correo_electronico ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const contacto = (proveedor.contacto ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return (
      nombre.includes(textoBusqueda) ||
      telefono.includes(textoBusqueda) ||
      correo.includes(textoBusqueda) ||
      contacto.includes(textoBusqueda)
    );
  });

  // =====================================================
  // 12. CÁLCULO DE PAGINACIÓN (.slice)
  // =====================================================

  const totalPaginas =
    Math.ceil(proveedoresFiltrados.length / elementosPorPagina) || 1;

  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;

  const proveedoresPaginados = proveedoresFiltrados.slice(
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
    proveedores,
    proveedoresFiltrados,
    proveedoresPaginados,

    // Paginación
    paginaActual,
    totalPaginas,
    paginaSiguiente,
    paginaAnterior,
    totalRegistros: proveedoresFiltrados.length,

    // Búsqueda
    busqueda,
    setBusqueda: manejarBusqueda,

    // Formulario
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,

    // Operaciones CRUD
    registrarProveedor,
    editarProveedor,
    modoEdicion,
    eliminarProveedor,

    // Detalle
    proveedorSeleccionado,
    verProveedor,
    cerrarDetalle,
  };
}

export default useProveedores;
