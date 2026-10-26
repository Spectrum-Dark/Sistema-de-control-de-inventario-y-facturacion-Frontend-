import { useState } from 'react';
import {
  ShieldCheck,
  UserRound,
  UserRoundCheck,
  UserRoundX,
  UsersRound,
} from 'lucide-react';
import { useUsuarios } from '../../hooks/usuarios/useUsuarios';
import { useAuth } from '../../hooks/sesion/useAuth';
import { useGestionCrud } from '../../hooks/compartido/useGestionCrud';
import {
  FILTROS_INICIALES,
  filtrarUsuarios,
} from '../../utils/usuarios/filtros';
import { esMismaCuenta } from '../../utils/usuarios/permisos';
import PaginaCrud from '../../components/compartido/PaginaCrud';
import FiltrosUsuarios from '../../components/usuarios/FiltrosUsuarios';
import TablaUsuarios from '../../components/usuarios/TablaUsuarios';
import ModalEditarUsuario from '../../components/usuarios/ModalEditarUsuario';
import ModalContrasena from '../../components/usuarios/ModalContrasena';
import { ID_ROL } from '../../utils/sesion/roles';

/**
 * COMPONENTE: ResumenUsuarios
 * Explicación: Componente de tipo KPI que calcula y muestra las métricas clave del módulo de usuarios
 * (total de cuentas administradas, cuentas activas, inactivas y administradores) mediante filtrados sobre el listado general.
 */
function ResumenUsuarios({ usuarios }) {
  const activos = usuarios.filter((u) => u.estado === 'Activo').length;
  const inactivos = usuarios.filter((u) => u.estado === 'Inactivo').length;
  const administradores = usuarios.filter(
    (u) => Number(u.id_rol) === ID_ROL.ADMINISTRADOR
  ).length;
  const metricas = [
    {
      etiqueta: 'Cuentas administradas',
      valor: usuarios.length,
      icono: UserRound,
    },
    { etiqueta: 'Activas', valor: activos, icono: UserRoundCheck },
    { etiqueta: 'Inactivas', valor: inactivos, icono: UserRoundX },
    { etiqueta: 'Administradores', valor: administradores, icono: ShieldCheck },
  ];

  return (
    <section
      className="grid grid-cols-2 gap-3 xl:grid-cols-4"
      aria-label="Resumen de usuarios"
    >
      {metricas.map(({ etiqueta, valor, icono: Icono }) => (
        <article
          key={etiqueta}
          className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Icono size={18} strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-medium text-slate-500">
              {etiqueta}
            </span>
            <span className="mt-0.5 block text-xl font-semibold tracking-tight text-slate-900">
              {valor}
            </span>
          </span>
        </article>
      ))}
    </section>
  );
}

/**
 * COMPONENTE PRINCIPAL: Usuarios
 * Explicación: Orquestador del módulo de administración de cuentas de usuario, encargado de obtener los registros,
 * excluir la cuenta activa actual de la lista de gestión, y administrar filtros, paginación, edición de roles y cambio de contraseñas mediante modales.
 */
export default function Usuarios() {
  // Extracción del listado general de usuarios y de la información de sesión del usuario autenticado actual.
  const { usuarios, cargando, error, recargar, actualizarEnLista } =
    useUsuarios();
  const { usuario: usuarioActual } = useAuth();

  // Estado local para controlar qué usuario tiene abierto el modal de cambio de contraseña.
  const [contrasenaDe, setContrasenaDe] = useState(null);

  // Filtrado de la lista para excluir la propia cuenta del administrador activo por seguridad.
  const otrosUsuarios = usuarios.filter(
    (fila) => !esMismaCuenta(fila, usuarioActual)
  );

  // Hook genérico de gestión CRUD adaptado para manejar los filtros, paginación y estado de los demás usuarios del sistema.
  const g = useGestionCrud({
    items: otrosUsuarios,
    filtrosIniciales: FILTROS_INICIALES,
    filtrar: filtrarUsuarios,
    recargar,
    actualizarEnLista,
    claveId: 'id_usuario',
  });

  return (
    /* 
      Componente de diseño reutilizable (PaginaCrud)
      Explicación: Estructura estándar que organiza la vista principal de administración de usuarios 
      (títulos, panel de métricas KPI, sección de filtros, tabla de datos y modales de edición de cuenta y restablecimiento de contraseña).
    */
    <PaginaCrud
      acento="neutro"
      titulo={
        <span className="inline-flex items-center gap-2.5">
          <span className="module-heading-icon module-heading-icon--neutro flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <UsersRound size={17} />
          </span>
          Usuarios
        </span>
      }
      subtitulo="Administra accesos, roles y estado de las cuentas del sistema."
      resumen={
        !cargando && !error ? (
          <ResumenUsuarios usuarios={otrosUsuarios} />
        ) : null
      }
      textoCarga="Cargando usuarios..."
      mensajeVacio="No hay otros usuarios registrados."
      mensajeSinResultados="Ningún usuario coincide con la búsqueda o los filtros."
      cargando={cargando}
      error={error}
      recargar={recargar}
      hayDatos={otrosUsuarios.length > 0}
      puedeCrear={false}
      filtros={
        <FiltrosUsuarios
          filtros={g.filtros}
          onCambiar={g.cambiarFiltro}
          onLimpiar={g.limpiarFiltros}
          hayFiltros={g.hayFiltros}
        />
      }
      hayFiltros={g.hayFiltros}
      hayResultados={g.filtrados.length > 0}
      tabla={
        <TablaUsuarios
          usuarios={g.paginacion.visibles}
          usuarioActual={usuarioActual}
          onEditar={g.abrirModal}
          onCambiarContrasena={setContrasenaDe}
        />
      }
      paginacion={g.paginacion}
    >
      {/* Modal para editar la información, rol o estado de un usuario seleccionado */}
      {g.modal && (
        <ModalEditarUsuario
          key={g.modal.registro.id_usuario}
          usuario={g.modal.registro}
          usuarioActual={usuarioActual}
          onCerrar={g.cerrarModal}
          onGuardado={g.guardado}
        />
      )}

      {/* Modal específico para cambiar o restablecer la contraseña de un usuario */}
      {contrasenaDe && (
        <ModalContrasena
          key={contrasenaDe.id_usuario}
          usuario={contrasenaDe}
          onCerrar={() => setContrasenaDe(null)}
        />
      )}
    </PaginaCrud>
  );
}
