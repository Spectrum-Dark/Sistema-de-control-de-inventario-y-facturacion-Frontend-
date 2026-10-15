import IndicadoresUsuarios from "../../components/administracion/usuarios/indicadores_usuario";
import FiltrosUsuarios from "../../components/administracion/usuarios/filtros_usuarios";
import TablaUsuarios from "../../components/administracion/usuarios/tabla_usuarios";
import PaginacionUsuarios from "../../components/administracion/usuarios/paginacion_usuarios";
import FormularioUsuario from "../../components/administracion/usuarios/formulario_usuario";
import CambiarContrasena from "../../components/administracion/usuarios/cambiar_contrasena";
import useUsuarios from "../../hooks/administracion/usuarios/useUsuarios";

/**
 * Componente principal para la gestión de usuarios del sistema.
 * Actúa como una vista contenedora que integra la lógica del Hook personalizado
 * y distribuye los datos entre los diferentes componentes hijos (modularización).
 */
function Usuarios() {
  // Extracción de estados y acciones centralizados desde el Custom Hook
  const {
    // Datos y filtrado
    usuariosPaginados,
    busqueda,
    setBusqueda,
    filtroRol,
    setFiltroRol,
    filtroEstado,
    setFiltroEstado,
    limpiarFiltros,
    
    // Paginación y métricas
    pagina,
    cambiarPagina,
    totalPaginas,
    totalRegistros,
    inicio,
    fin,
    totalUsuarios,
    usuariosActivos,
    usuariosInactivos,
    
    // Control de carga y errores
    cargando,
    error,
    
    // Gestión y edición de usuarios
    usuarioSeleccionado,
    referenciaFormulario,
    datosFormulario,
    erroresFormulario,
    guardando,
    editarUsuario,
    cambiarCampoFormulario,
    guardarUsuario,
    cancelarEdicion,
    cambiarEstadoUsuario,

    // Gestión de contraseñas
    usuarioParaCambiarContrasena,
    nuevaContrasena,
    setNuevaContrasena,
    guardandoContrasena,
    abrirCambiarContrasena,
    cancelarCambiarContrasena,
    guardarNuevaContrasena,
  } = useUsuarios();

  return (
    <main className="space-y-6">
      {/* 1. Encabezado de la sección */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Usuarios
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Administra las cuentas y los roles de acceso al sistema.
        </p>
      </section>

      {/* 2. Tarjetas de indicadores estadísticos (KPIs) */}
      <IndicadoresUsuarios
        total={totalUsuarios}
        activos={usuariosActivos}
        inactivos={usuariosInactivos}
      />

      {/* 3. Barra de búsqueda avanzada y filtros por rol/estado */}
      <FiltrosUsuarios
        busqueda={busqueda}
        onCambiarBusqueda={setBusqueda}
        filtroRol={filtroRol}
        onCambiarRol={setFiltroRol}
        filtroEstado={filtroEstado}
        onCambiarEstado={setFiltroEstado}
        onLimpiarFiltros={limpiarFiltros}
      />

      {/* 4. Formulario dinámico (Renderizado condicional para edición) */}
      {usuarioSeleccionado && (
        <div ref={referenciaFormulario}>
          <FormularioUsuario
            usuario={usuarioSeleccionado}
            datosFormulario={datosFormulario}
            erroresFormulario={erroresFormulario}
            cambiarCampoFormulario={cambiarCampoFormulario}
            guardarUsuario={guardarUsuario}
            cancelarEdicion={cancelarEdicion}
            guardando={guardando}
          />
        </div>
      )}

      {/* 5. Tabla principal de visualización de registros */}
      <TablaUsuarios
        usuarios={usuariosPaginados}
        cargando={cargando}
        error={error}
        onEditar={editarUsuario}
        onCambiarEstado={cambiarEstadoUsuario}
        onCambiarContrasena={abrirCambiarContrasena}
        onRestablecerContrasena={abrirCambiarContrasena}
      />

      {/* 6. Controles de navegación y paginación */}
      <PaginacionUsuarios
        pagina={pagina}
        totalPaginas={totalPaginas}
        totalRegistros={totalRegistros}
        inicio={inicio}
        fin={fin}
        onCambiarPagina={cambiarPagina}
      />

      {/* 7. Modal o formulario emergente para cambio de contraseña */}
      <CambiarContrasena
        usuario={usuarioParaCambiarContrasena}
        nuevaContrasena={nuevaContrasena}
        setNuevaContrasena={setNuevaContrasena}
        cancelar={cancelarCambiarContrasena}
        guardar={guardarNuevaContrasena}
        guardando={guardandoContrasena}
      />
    </main>
  );
}

export default Usuarios;