import { useState } from "react"

function useProductos() {
  // =====================================================
  // 1. ESTADOS DE BÚSQUEDA Y FILTROS
  // =====================================================

  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("")


  // =====================================================
  // 2. ESTADOS DE PAGINACIÓN
  // =====================================================

  const [paginaActual, setPaginaActual] = useState(1)

  // ----------------------------------------------------
  // CONFIGURACIÓN DE ELEMENTOS POR PÁGINA
  // Cambia este número (ej. 5, 10, 15) para ajustar 
  // cuántos productos se muestran por cada página.
  // ----------------------------------------------------
  const elementosPorPagina = 10


  // =====================================================
  // 3. ESTADOS DEL FORMULARIO Y EDICIÓN
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)

  const [formulario, setFormulario] = useState({
    codigo_producto: "",
    nombre: "",
    descripcion: "",
    id_categoria: "",
    precio_compra: "",
    precio_venta: "",
    existencia_minima: "",
    existencia_maxima: "",
  })


  // =====================================================
  // 4. ESTADO PARA CONSULTAR DETALLE
  // =====================================================

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)


  // =====================================================
  // 5. DATOS TEMPORALES (20 REGISTROS DE PRUEBA)
  // =====================================================

  const productos = [
    {
      id_producto: 1,
      codigo_producto: "REP-001",
      nombre: "Filtro de aceite",
      descripcion: "Filtro sintético de alto flujo para motores de 4 cilindros.",
      id_categoria: 1,
      categoria: "Filtros",
      id_marca: 1,
      marca: "Toyota",
      precio_compra: 180,
      precio_venta: 250,
      existencia_actual: 24,
      existencia_minima: 10,
      existencia_maxima: 50,
    },
    {
      id_producto: 2,
      codigo_producto: "REP-002",
      nombre: "Pastillas de freno delanteras",
      descripcion: "Pastillas de freno cerámicas para mayor durabilidad y menos ruido.",
      id_categoria: 2,
      categoria: "Frenos",
      id_marca: 2,
      marca: "Nissan",
      precio_compra: 850,
      precio_venta: 1150,
      existencia_actual: 8,
      existencia_minima: 10,
      existencia_maxima: 30,
    },
    {
      id_producto: 3,
      codigo_producto: "REP-003",
      nombre: "Bujías de Iridio",
      descripcion: "Bujía de Iridio de alto rendimiento para un encendido rápido.",
      id_categoria: 3,
      categoria: "Motor",
      id_marca: 3,
      marca: "NGK",
      precio_compra: 120,
      precio_venta: 175,
      existencia_actual: 36,
      existencia_minima: 12,
      existencia_maxima: 60,
    },
    {
      id_producto: 4,
      codigo_producto: "REP-004",
      nombre: "Filtro de aire",
      descripcion: "Filtro de aire de papel plegado de alta densidad para motor.",
      id_categoria: 1,
      categoria: "Filtros",
      id_marca: 2,
      marca: "Nissan",
      precio_compra: 320,
      precio_venta: 450,
      existencia_actual: 5,
      existencia_minima: 8,
      existencia_maxima: 25,
    },
    {
      id_producto: 5,
      codigo_producto: "REP-005",
      nombre: "Correa de distribución",
      descripcion: "Correa dentada reforzada con fibra de vidrio de alta resistencia.",
      id_categoria: 3,
      categoria: "Motor",
      id_marca: 1,
      marca: "Toyota",
      precio_compra: 950,
      precio_venta: 1350,
      existencia_actual: 15,
      existencia_minima: 5,
      existencia_maxima: 20,
    },
    {
      id_producto: 6,
      codigo_producto: "REP-006",
      nombre: "Disco de freno ventilado",
      descripcion: "Disco de freno delantero de acero templado resistente al calor.",
      id_categoria: 2,
      categoria: "Frenos",
      id_marca: 4,
      marca: "Brembo",
      precio_compra: 1400,
      precio_venta: 1950,
      existencia_actual: 12,
      existencia_minima: 4,
      existencia_maxima: 16,
    },
    {
      id_producto: 7,
      codigo_producto: "REP-007",
      nombre: "Amortiguador delantero",
      descripcion: "Amortiguador de gas presurizado para suspensión delantera.",
      id_categoria: 4,
      categoria: "Suspensión",
      id_marca: 5,
      marca: "Monroe",
      precio_compra: 1850,
      precio_venta: 2400,
      existencia_actual: 6,
      existencia_minima: 4,
      existencia_maxima: 12,
    },
    {
      id_producto: 8,
      codigo_producto: "REP-008",
      nombre: "Batería 12V 60Ah",
      descripcion: "Batería de libre mantenimiento para vehículos sedan y SUV.",
      id_categoria: 5,
      categoria: "Eléctrico",
      id_marca: 6,
      marca: "Bosch",
      precio_compra: 2800,
      precio_venta: 3600,
      existencia_actual: 10,
      existencia_minima: 3,
      existencia_maxima: 15,
    },
    {
      id_producto: 9,
      codigo_producto: "REP-009",
      nombre: "Filtro de combustible",
      descripcion: "Filtro para líneas de inyección de gasolina.",
      id_categoria: 1,
      categoria: "Filtros",
      id_marca: 1,
      marca: "Toyota",
      precio_compra: 240,
      precio_venta: 380,
      existencia_actual: 18,
      existencia_minima: 6,
      existencia_maxima: 30,
    },
    {
      id_producto: 10,
      codigo_producto: "REP-010",
      nombre: "Bomba de agua",
      descripcion: "Bomba de agua con empaque de sellado térmico incluido.",
      id_categoria: 3,
      categoria: "Motor",
      id_marca: 6,
      marca: "Bosch",
      precio_compra: 1100,
      precio_venta: 1600,
      existencia_actual: 7,
      existencia_minima: 3,
      existencia_maxima: 10,
    },
    {
      id_producto: 11,
      codigo_producto: "REP-011",
      nombre: "Sensor MAF de flujo de aire",
      descripcion: "Sensor de masa de flujo de aire para inyección electrónica.",
      id_categoria: 5,
      categoria: "Eléctrico",
      id_marca: 3,
      marca: "NGK",
      precio_compra: 1650,
      precio_venta: 2200,
      existencia_actual: 4,
      existencia_minima: 2,
      existencia_maxima: 8,
    },
    {
      id_producto: 12,
      codigo_producto: "REP-012",
      nombre: "Kit de embrague (Clutch)",
      descripcion: "Incluye disco, prensa y balineras de empuje heavy duty.",
      id_categoria: 3,
      categoria: "Motor",
      id_marca: 2,
      marca: "Nissan",
      precio_compra: 3200,
      precio_venta: 4200,
      existencia_actual: 3,
      existencia_minima: 2,
      existencia_maxima: 6,
    },
    {
      id_producto: 13,
      codigo_producto: "REP-013",
      nombre: "Liquido de frenos DOT 4",
      descripcion: "Envase de 500ml con alto punto de ebullición para sistemas ABS.",
      id_categoria: 2,
      categoria: "Frenos",
      id_marca: 6,
      marca: "Bosch",
      precio_compra: 150,
      precio_venta: 220,
      existencia_actual: 40,
      existencia_minima: 10,
      existencia_maxima: 80,
    },
    {
      id_producto: 14,
      codigo_producto: "REP-014",
      nombre: "Rótula de dirección",
      descripcion: "Rótula inferior para terminales de dirección asistida.",
      id_categoria: 4,
      categoria: "Suspensión",
      id_marca: 5,
      marca: "Monroe",
      precio_compra: 420,
      precio_venta: 650,
      existencia_actual: 14,
      existencia_minima: 5,
      existencia_maxima: 20,
    },
    {
      id_producto: 15,
      codigo_producto: "REP-015",
      nombre: "Alternador 12V 90A",
      descripcion: "Alternador reestructurado con regulador de voltaje integrado.",
      id_categoria: 5,
      categoria: "Eléctrico",
      id_marca: 6,
      marca: "Bosch",
      precio_compra: 3400,
      precio_venta: 4500,
      existencia_actual: 2,
      existencia_minima: 2,
      existencia_maxima: 5,
    },
    {
      id_producto: 16,
      codigo_producto: "REP-016",
      nombre: "Radiador de aluminio",
      descripcion: "Radiador de alto rendimiento para sistema de enfriamiento.",
      id_categoria: 3,
      categoria: "Motor",
      id_marca: 1,
      marca: "Toyota",
      precio_compra: 2100,
      precio_venta: 2900,
      existencia_actual: 5,
      existencia_minima: 2,
      existencia_maxima: 8,
    },
    {
      id_producto: 17,
      codigo_producto: "REP-017",
      nombre: "Termostato de refrigerante",
      descripcion: "Apertura a 82°C para óptimo control de temperatura.",
      id_categoria: 3,
      categoria: "Motor",
      id_marca: 1,
      marca: "Toyota",
      precio_compra: 280,
      precio_venta: 420,
      existencia_actual: 22,
      existencia_minima: 5,
      existencia_maxima: 30,
    },
    {
      id_producto: 18,
      codigo_producto: "REP-018",
      nombre: "Filtro de cabina / Aire acondicionado",
      descripcion: "Filtro de carbón activado para eliminar malos olores y polen.",
      id_categoria: 1,
      categoria: "Filtros",
      id_marca: 2,
      marca: "Nissan",
      precio_compra: 260,
      precio_venta: 400,
      existencia_actual: 11,
      existencia_minima: 4,
      existencia_maxima: 20,
    },
    {
      id_producto: 19,
      codigo_producto: "REP-019",
      nombre: "Cilindro maestro de freno",
      descripcion: "Bomba principal de freno con depósito de fluido plástico.",
      id_categoria: 2,
      categoria: "Frenos",
      id_marca: 4,
      marca: "Brembo",
      precio_compra: 1750,
      precio_venta: 2350,
      existencia_actual: 4,
      existencia_minima: 2,
      existencia_maxima: 8,
    },
    {
      id_producto: 20,
      codigo_producto: "REP-020",
      nombre: "Cables de bujía reforzados",
      descripcion: "Juego de 4 cables de silicona de 8mm para alta supresión de ruido.",
      id_categoria: 5,
      categoria: "Eléctrico",
      id_marca: 3,
      marca: "NGK",
      precio_compra: 480,
      precio_venta: 720,
      existencia_actual: 16,
      existencia_minima: 4,
      existencia_maxima: 25,
    },
  ]


  // =====================================================
  // 6. LIMPIEZA Y CONTROL DEL FORMULARIO
  // =====================================================

  const limpiarFormulario = () => {
    setFormulario({
      codigo_producto: "",
      nombre: "",
      descripcion: "",
      id_categoria: "",
      precio_compra: "",
      precio_venta: "",
      existencia_minima: "",
      existencia_maxima: "",
    })
    setModoEdicion(false)
    setProductoEditando(null)
  }

  const alternarFormulario = () => {
    limpiarFormulario()
    setMostrarFormulario((estadoActual) => !estadoActual)
  }

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }))
  }


  // =====================================================
  // 7. CONSULTAR DETALLE DE UN PRODUCTO
  // =====================================================

  const verProducto = (producto) => {
    setProductoSeleccionado(producto)
  }

  const cerrarDetalle = () => {
    setProductoSeleccionado(null)
  }


  // =====================================================
  // 8. PREPARAR EDICIÓN (CARGA DE DATOS)
  // =====================================================

  const editarProducto = (producto) => {
    setModoEdicion(true)
    setProductoEditando(producto)

    setFormulario({
      codigo_producto: producto.codigo_producto ?? "",
      nombre: producto.nombre ?? "",
      descripcion: producto.descripcion ?? "",
      id_categoria: producto.id_categoria ?? "",
      precio_compra: producto.precio_compra ?? "",
      precio_venta: producto.precio_venta ?? "",
      existencia_minima: producto.existencia_minima ?? "",
      existencia_maxima: producto.existencia_maxima ?? "",
    })

    setMostrarFormulario(true)
  }


  // =====================================================
  // 9. REGISTRAR O EDITAR PRODUCTO
  // =====================================================

  const registrarProducto = (evento) => {
    evento.preventDefault()

    if (
      !formulario.codigo_producto.trim() ||
      !formulario.nombre.trim() ||
      !formulario.id_categoria ||
      !formulario.precio_compra ||
      !formulario.precio_venta
    ) {
      console.log("Complete los campos obligatorios.")
      return
    }

    const precioCompra = Number(formulario.precio_compra)
    const precioVenta = Number(formulario.precio_venta)
    const existenciaMinima = Number(formulario.existencia_minima)
    const existenciaMaxima = Number(formulario.existencia_maxima)

    if (precioCompra <= 0 || precioVenta <= 0) {
      console.log("Los precios deben ser mayores que cero.")
      return
    }

    if (existenciaMinima < 0) {
      console.log("La existencia mínima no puede ser negativa.")
      return
    }

    if (existenciaMaxima < existenciaMinima) {
      console.log("La existencia máxima no puede ser menor que la mínima.")
      return
    }

    const datosProducto = {
      codigo_producto: formulario.codigo_producto.trim(),
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      id_categoria: Number(formulario.id_categoria),
      precio_compra: precioCompra,
      precio_venta: precioVenta,
      existencia_minima: existenciaMinima,
      existencia_maxima: existenciaMaxima,
    }

    if (modoEdicion) {
      console.log("Actualización de producto:", {
        id_producto: productoEditando.id_producto,
        ...datosProducto,
      })
    } else {
      console.log("Registro de producto:", datosProducto)
    }

    limpiarFormulario()
    setMostrarFormulario(false)
  }


  // =====================================================
  // 10. BÚSQUEDA Y FILTRADO DE PRODUCTOS
  // =====================================================

  const textoBusqueda = busqueda
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  const productosFiltrados = productos.filter((producto) => {
    const codigo = producto.codigo_producto.toLowerCase()

    const nombre = producto.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    const categoria = producto.categoria
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    const marca = producto.marca
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    const coincideBusqueda =
      codigo.includes(textoBusqueda) ||
      nombre.includes(textoBusqueda) ||
      categoria.includes(textoBusqueda) ||
      marca.includes(textoBusqueda)

    const coincideCategoria =
      categoriaSeleccionada === "" ||
      producto.id_categoria === Number(categoriaSeleccionada)

    const coincideMarca =
      marcaSeleccionada === "" ||
      producto.id_marca === Number(marcaSeleccionada)

    return coincideBusqueda && coincideCategoria && coincideMarca
  })


  // =====================================================
  // 11. RECORTE DE PAGINACIÓN (.slice)
  // =====================================================

  const totalPaginas =
    Math.ceil(productosFiltrados.length / elementosPorPagina) || 1

  const indiceInicial = (paginaActual - 1) * elementosPorPagina
  const indiceFinal = indiceInicial + elementosPorPagina

  // Lista recortada únicamente con los productos de la página activa
  const productosPaginados = productosFiltrados.slice(
    indiceInicial,
    indiceFinal
  )

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual((prev) => prev + 1)
  }

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual((prev) => prev - 1)
  }

  const manejarBusqueda = (valor) => {
    setBusqueda(valor)
    setPaginaActual(1)
  }

  const manejarCategoria = (valor) => {
    setCategoriaSeleccionada(valor)
    setPaginaActual(1)
  }

  const manejarMarca = (valor) => {
    setMarcaSeleccionada(valor)
    setPaginaActual(1)
  }


  // =====================================================
  // 12. CATEGORÍAS Y MARCAS DISPONIBLES
  // =====================================================

  const categorias = [
    ...new Map(
      productos.map((prod) => [prod.id_categoria, prod.categoria])
    ).entries(),
  ].map(([id_categoria, nombre]) => ({ id_categoria, nombre }))

  const marcas = [
    ...new Map(
      productos.map((prod) => [prod.id_marca, prod.marca])
    ).entries(),
  ].map(([id_marca, nombre]) => ({ id_marca, nombre }))


  // =====================================================
  // 13. EXPORTACIÓN DE PROPIEDADES Y FUNCIONES
  // =====================================================

  return {
    productos,
    productosFiltrados,
    productosPaginados, // <-- La lista recortada

    // Paginación
    paginaActual,
    totalPaginas,
    paginaSiguiente,
    paginaAnterior,
    totalRegistros: productosFiltrados.length,

    // Filtros
    busqueda,
    setBusqueda: manejarBusqueda,
    categorias,
    categoriaSeleccionada,
    setCategoriaSeleccionada: manejarCategoria,
    marcas,
    marcaSeleccionada,
    setMarcaSeleccionada: manejarMarca,

    // Formulario
    mostrarFormulario,
    alternarFormulario,
    formulario,
    manejarCambio,
    registrarProducto,
    editarProducto,
    modoEdicion,

    // Detalle
    productoSeleccionado,
    verProducto,
    cerrarDetalle,
  }
}

export default useProductos