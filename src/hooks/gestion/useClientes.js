import { useState } from "react";

function useClientes() {
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
  // Ajusta este valor para determinar la cantidad de
  // clientes visibles por página en la tabla.
  // ----------------------------------------------------
  const elementosPorPagina = 10;

  // =====================================================
  // 3. ESTADOS DEL FORMULARIO Y EDICIÓN
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo_electronico: "",
    direccion: "",
  });

  // =====================================================
  // 4. ESTADO PARA CONSULTAR DETALLE
  // =====================================================

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // =====================================================
  // 5. DATOS TEMPORALES (PRUEBA CON +10 REGISTROS)
  // =====================================================

  const clientes = [
    {
      id_cliente: 1,
      nombre: "Juan",
      apellido: "Pérez",
      telefono: "8888-1001",
      correo_electronico: "juan.perez@correo.com",
      direccion: "Reparato San Juan, Managua",
    },
    {
      id_cliente: 2,
      nombre: "María",
      apellido: "González",
      telefono: "8888-1002",
      correo_electronico: "maria.gonzalez@correo.com",
      direccion: "De la catedral 2c al sur, León",
    },
    {
      id_cliente: 3,
      nombre: "Carlos",
      apellido: "Martínez",
      telefono: "8888-1003",
      correo_electronico: "carlos.martinez@correo.com",
      direccion: "Barrio San Antonio, Chinandega",
    },
    {
      id_cliente: 4,
      nombre: "Ana",
      apellido: "Rodríguez",
      telefono: "8888-1004",
      correo_electronico: "ana.rodriguez@correo.com",
      direccion: "Monimbó, Masaya",
    },
    {
      id_cliente: 5,
      nombre: "Pedro",
      apellido: "Hernández",
      telefono: "8888-1005",
      correo_electronico: "pedro.hernandez@correo.com",
      direccion: "Ciudad Jardín, Managua",
    },
    {
      id_cliente: 6,
      nombre: "Laura",
      apellido: "Espinoza",
      telefono: "8888-1006",
      correo_electronico: "laura.espinoza@correo.com",
      direccion: "Barrio Central, Granada",
    },
    {
      id_cliente: 7,
      nombre: "Ricardo",
      apellido: "Morales",
      telefono: "8888-1007",
      correo_electronico: "ricardo.morales@correo.com",
      direccion: "Barrio La Fuente, Estelí",
    },
    {
      id_cliente: 8,
      nombre: "Carmen",
      apellido: "Rios",
      telefono: "8888-1008",
      correo_electronico: "carmen.rios@correo.com",
      direccion: "Reparato Belén, Rivas",
    },
    {
      id_cliente: 9,
      nombre: "Gabriel",
      apellido: "Torres",
      telefono: "8888-1009",
      correo_electronico: "gabriel.torres@correo.com",
      direccion: "Barrio Guanacaste, Jinotepe",
    },
    {
      id_cliente: 10,
      nombre: "Sofía",
      apellido: "Sánchez",
      telefono: "8888-1010",
      correo_electronico: "sofia.sanchez@correo.com",
      direccion: "Pista Suburbana, Managua",
    },
    {
      id_cliente: 11,
      nombre: "Diego",
      apellido: "Castillo",
      telefono: "8888-1011",
      correo_electronico: "diego.castillo@correo.com",
      direccion: "Comarca Zaragoza, León",
    },
  ];

  // =====================================================
  // 6. CONTROL Y LIMPIEZA DEL FORMULARIO
  // =====================================================

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      apellido: "",
      telefono: "",
      correo_electronico: "",
      direccion: "",
    });
    setModoEdicion(false);
    setClienteEditando(null);
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

  const verCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const cerrarDetalle = () => {
    setClienteSeleccionado(null);
  };

  // =====================================================
  // 8. PREPARAR EDICIÓN
  // =====================================================

  const editarCliente = (cliente) => {
    setModoEdicion(true);
    setClienteEditando(cliente);

    setFormulario({
      nombre: cliente.nombre ?? "",
      apellido: cliente.apellido ?? "",
      telefono: cliente.telefono ?? "",
      correo_electronico: cliente.correo_electronico ?? "",
      direccion: cliente.direccion ?? "",
    });

    setMostrarFormulario(true);
  };

  // =====================================================
  // 9. REGISTRAR O EDITAR CLIENTE
  // =====================================================

  const registrarCliente = (evento) => {
    evento.preventDefault();

    if (!formulario.nombre.trim()) {
      console.log("El nombre del cliente es obligatorio.");
      return;
    }

    if (!formulario.apellido.trim()) {
      console.log("El apellido del cliente es obligatorio.");
      return;
    }

    if (!formulario.telefono.trim()) {
      console.log("El teléfono del cliente es obligatorio.");
      return;
    }

    const datosCliente = {
      nombre: formulario.nombre.trim(),
      apellido: formulario.apellido.trim(),
      telefono: formulario.telefono.trim(),
      correo_electronico: formulario.correo_electronico.trim(),
      direccion: formulario.direccion.trim(),
    };

    if (modoEdicion) {
      console.log("Actualización de cliente:", {
        id_cliente: clienteEditando.id_cliente,
        ...datosCliente,
      });
    } else {
      console.log("Registro de cliente:", datosCliente);
    }

    limpiarFormulario();
    setMostrarFormulario(false);
  };

  // =====================================================
  // 10. ELIMINAR CLIENTE
  // =====================================================

  const eliminarCliente = (cliente) => {
    console.log("Eliminar cliente:", {
      id_cliente: cliente.id_cliente,
    });
  };

  // =====================================================
  // 11. BÚSQUEDA Y FILTRADO
  // =====================================================

  const textoBusqueda = busqueda
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const clientesFiltrados = clientes.filter((cliente) => {
    const nombre = (cliente.nombre ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const apellido = (cliente.apellido ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const telefono = (cliente.telefono ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const correo = (cliente.correo_electronico ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return (
      nombre.includes(textoBusqueda) ||
      apellido.includes(textoBusqueda) ||
      telefono.includes(textoBusqueda) ||
      correo.includes(textoBusqueda)
    );
  });

  // =====================================================
  // 12. CÁLCULO DE PAGINACIÓN (.slice)
  // =====================================================

  const totalPaginas =
    Math.ceil(clientesFiltrados.length / elementosPorPagina) || 1;

  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicial + elementosPorPagina;

  const clientesPaginados = clientesFiltrados.slice(indiceInicial, indiceFinal);

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
    clientes,
    clientesFiltrados,
    clientesPaginados,

    // Paginación
    paginaActual,
    totalPaginas,
    paginaSiguiente,
    paginaAnterior,
    totalRegistros: clientesFiltrados.length,

    // Búsqueda
    busqueda,
    setBusqueda: manejarBusqueda,

    // Formulario
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,

    // Operaciones CRUD
    registrarCliente,
    editarCliente,
    modoEdicion,
    eliminarCliente,

    // Detalle
    clienteSeleccionado,
    verCliente,
    cerrarDetalle,
  };
}

export default useClientes;
