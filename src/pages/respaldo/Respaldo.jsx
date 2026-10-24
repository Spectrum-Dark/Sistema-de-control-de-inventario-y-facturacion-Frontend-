import { useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Database, Download, FileArchive, FileUp, HardDriveDownload, Loader2, ShieldCheck } from "lucide-react";
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
    } catch (e) { setError(e.message); } finally { setDescargando(false); }
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
    } finally { setRestaurando(false); }
  };

  return (
    <div className="space-y-5">
      <header className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="module-heading-icon module-heading-icon--neutro flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"><Database size={17} /></span>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Respaldos de base de datos</h1>
        </div>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Descarga una copia SQL o restaura una copia existente.</p>
      </header>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"><HardDriveDownload size={19} /></span><div><h2 className="text-sm font-semibold text-slate-900">Descargar respaldo</h2><p className="mt-0.5 text-xs text-slate-500">Genera una copia SQL de la base configurada.</p></div></div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5"><span className="mt-0.5 text-slate-500"><FileArchive size={17} /></span><div><p className="text-xs font-medium text-slate-800">Archivo de base de datos</p><p className="mt-1 text-[11px] leading-relaxed text-slate-500">La descarga se genera desde el servidor y se guarda como archivo .sql.</p></div></div>
            <button type="button" onClick={descargar} disabled={descargando} className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 text-xs font-semibold text-white transition hover:bg-slate-900 disabled:opacity-60 sm:w-auto">{descargando ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}{descargando ? "Generando respaldo..." : "Descargar respaldo SQL"}</button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"><FileUp size={19} /></span><div><h2 className="text-sm font-semibold text-slate-900">Restaurar respaldo</h2><p className="mt-0.5 text-xs text-slate-500">Carga una copia SQL de hasta 50 MB.</p></div></div>
          </div>
          <div className="p-4 sm:p-5">
            <label className="block text-[11px] font-semibold text-slate-600">Archivo SQL<input ref={entradaArchivo} type="file" accept=".sql" onChange={seleccionarArchivo} className="mt-1.5 block min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-normal text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-slate-700" /></label>
            {archivo ? <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5"><CheckCircle2 size={16} className="shrink-0 text-slate-600" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-slate-800">{archivo.name}</p><p className="mt-0.5 text-[10px] text-slate-500">{(archivo.size / (1024 * 1024)).toFixed(2)} MB</p></div></div> : <p className="mt-2 text-[10px] text-slate-500">Formato permitido: .sql · Tamaño máximo: 50 MB</p>}
            <button type="button" onClick={() => { setError(""); setConfirmarRestauracion(true); }} disabled={!archivo || restaurando} className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"><Database size={15} />Restaurar base de datos</button>
          </div>
        </section>
      </div>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">{error}</p>}
      <aside className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5"><AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-700" /><div><p className="text-xs font-semibold text-amber-700">Antes de restaurar</p><p className="mt-1 text-xs leading-relaxed text-amber-700">El archivo se procesará sobre la base de datos configurada y puede reemplazar o modificar datos existentes. Confirma que seleccionaste la copia correcta.</p></div><ShieldCheck size={17} className="ml-auto mt-0.5 hidden shrink-0 text-amber-700 sm:block" /></aside>

      {confirmarRestauracion && archivo && <ModalConfirmacion titulo="Confirmar restauración" mensaje={<>Se procesará <strong>{archivo.name}</strong> sobre la base de datos configurada. Esta operación puede reemplazar o modificar los datos actuales.</>} textoConfirmar="Restaurar base de datos" textoProceso="Restaurando..." variante="peligro" onConfirmar={restaurar} onCerrar={() => !restaurando && setConfirmarRestauracion(false)} />}
    </div>
  );
}
