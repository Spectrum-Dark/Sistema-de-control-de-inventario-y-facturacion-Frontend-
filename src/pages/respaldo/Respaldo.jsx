import { useRef, useState } from "react";
import { Database, Download, FileUp, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import ModalConfirmacion from "../../components/compartido/ModalConfirmacion";
import { descargarRespaldo, restaurarRespaldo } from "../../services/respaldo/respaldoService";

const MAXIMO_ARCHIVO = 50 * 1024 * 1024;

export default function Respaldo() {
  const entradaArchivo = useRef(null);
  const [archivo, setArchivo] = useState(null);
  const [descargando, setDescargando] = useState(false);
  const [restaurando, setRestaurando] = useState(false);
  const [confirmarRestauracion, setConfirmarRestauracion] = useState(false);
  const [error, setError] = useState("");

  const seleccionarArchivo = (evento) => {
    const seleccionado = evento.target.files?.[0] ?? null;
    setError("");
    if (seleccionado && !seleccionado.name.toLowerCase().endsWith(".sql")) {
      setArchivo(null);
      setError("Selecciona un archivo con extensión .sql.");
      evento.target.value = "";
      return;
    }
    if (seleccionado && seleccionado.size > MAXIMO_ARCHIVO) {
      setArchivo(null);
      setError("El archivo supera el máximo permitido de 50 MB.");
      evento.target.value = "";
      return;
    }
    setArchivo(seleccionado);
  };

  const descargar = async () => {
    setDescargando(true);
    setError("");
    try {
      await descargarRespaldo();
      sileo.success({ title: "Respaldo descargado", description: "El archivo SQL se guardó en tus descargas." });
    } catch (e) {
      setError(e.message);
    } finally {
      setDescargando(false);
    }
  };

  const restaurar = async () => {
    if (!archivo) throw new Error("Selecciona primero un archivo SQL.");
    setRestaurando(true);
    try {
      const respuesta = await restaurarRespaldo(archivo);
      sileo.success({ title: "Restauración procesada", description: respuesta.message });
      setArchivo(null);
      if (entradaArchivo.current) entradaArchivo.current.value = "";
      setConfirmarRestauracion(false);
    } finally {
      setRestaurando(false);
    }
  };

  return (
    <div className="space-y-5">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Respaldos de base de datos</h1>
        <p className="mt-1 text-sm text-slate-500">Descarga una copia SQL o restaura una copia existente.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3"><span className="rounded-xl bg-slate-100 p-2.5 text-slate-700"><Download size={20} /></span><div><h2 className="font-semibold text-slate-900">Descargar respaldo</h2><p className="text-sm text-slate-500">Genera una copia SQL de la base configurada.</p></div></div>
          <button type="button" onClick={descargar} disabled={descargando} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:opacity-60">{descargando ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}{descargando ? "Generando respaldo..." : "Descargar SQL"}</button>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3"><span className="rounded-xl bg-slate-100 p-2.5 text-slate-700"><FileUp size={20} /></span><div><h2 className="font-semibold text-slate-900">Restaurar respaldo</h2><p className="text-sm text-slate-500">Elige un archivo SQL de hasta 50 MB.</p></div></div>
          <label className="mt-5 block text-sm font-medium text-slate-700">Archivo SQL<input ref={entradaArchivo} type="file" accept=".sql" onChange={seleccionarArchivo} className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700" /></label>
          {archivo && <p className="mt-2 text-xs text-slate-500">{archivo.name} · {(archivo.size / (1024 * 1024)).toFixed(2)} MB</p>}
          <button type="button" onClick={() => { setError(""); setConfirmarRestauracion(true); }} disabled={!archivo || restaurando} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"><Database size={16} />Restaurar base de datos</button>
        </section>
      </div>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">La restauración procesa el archivo contra la base de datos configurada y puede reemplazar o modificar datos existentes.</p>

      {confirmarRestauracion && archivo && <ModalConfirmacion titulo="Confirmar restauración" mensaje={<>Se procesará <strong>{archivo.name}</strong> sobre la base de datos configurada. Esta operación puede reemplazar o modificar los datos actuales.</>} textoConfirmar="Restaurar base de datos" textoProceso="Restaurando..." variante="peligro" onConfirmar={restaurar} onCerrar={() => !restaurando && setConfirmarRestauracion(false)} />}
    </div>
  );
}
