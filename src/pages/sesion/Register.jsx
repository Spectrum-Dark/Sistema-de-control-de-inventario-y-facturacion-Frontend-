import { Package } from 'lucide-react'
import FormularioRegistro from '../../components/sesion/FormularioRegistro'

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-white">
            <Package size={24} />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Crear cuenta</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sistema de inventario y facturación
          </p>
        </div>

        <FormularioRegistro />
      </div>
    </div>
  )
}