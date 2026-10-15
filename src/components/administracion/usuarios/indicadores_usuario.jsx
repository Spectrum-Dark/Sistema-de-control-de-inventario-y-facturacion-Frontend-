import { Users, UserCheck, UserX } from "lucide-react";

/**
 * Componente de indicadores estadísticos (KPIs) para la gestión de usuarios.
 * Muestra tarjetas métricas en tiempo real sobre el total de cuentas registradas,
 * así como la distribución entre usuarios activos e inactivos.
 */
function IndicadoresUsuarios({ total, activos, inactivos }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      
      {/* 1. Tarjeta: Total de usuarios */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total de usuarios
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users size={20} />
          </div>
        </div>

        <p className="mt-3 text-2xl font-bold text-slate-900">{total}</p>

        <p className="mt-1 text-xs text-slate-400">
          Cuentas registradas en el sistema
        </p>
      </div>

      {/* 2. Tarjeta: Usuarios activos */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Usuarios activos
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <UserCheck size={20} />
          </div>
        </div>

        <p className="mt-3 text-2xl font-bold text-emerald-600">{activos}</p>

        <p className="mt-1 text-xs text-slate-400">Cuentas con estado activo</p>
      </div>

      {/* 3. Tarjeta: Usuarios inactivos */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Usuarios inactivos
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <UserX size={20} />
          </div>
        </div>

        <p className="mt-3 text-2xl font-bold text-slate-500">{inactivos}</p>

        <p className="mt-1 text-xs text-slate-400">Cuentas desactivadas</p>
      </div>
    </section>
  );
}

export default IndicadoresUsuarios;