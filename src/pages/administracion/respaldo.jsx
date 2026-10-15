import { useRef, useState } from "react";

function Respaldo() {
  const inputArchivo = useRef(null);

  const [respaldos, setRespaldos] = useState([
    {
      id: 1,
      nombre: "respaldo_bd_2026-10-10_0800.sql",
      fecha: "10/10/2026 08:00",
      tamano: "2.4 MB",
      estado: "Disponible",
    },
    {
      id: 2,
      nombre: "respaldo_bd_2026-10-09_0800.sql",
      fecha: "09/10/2026 08:00",
      tamano: "2.1 MB",
      estado: "Disponible",
    },
    {
      id: 3,
      nombre: "respaldo_bd_2026-10-08_0800.sql",
      fecha: "08/10/2026 08:00",
      tamano: "1.9 MB",
      estado: "Disponible",
    },
  ]);

  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [procesando, setProcesando] = useState(false);

  const fechaActual = () => {
    return new Date().toLocaleString("es-NI", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
  };

  // Solicitud de creación de respaldo.
  // Pendiente: conectar con el servicio de respaldos de Laravel.
  const crearRespaldo = () => {
    setProcesando(true);
    setMensaje(null);

    console.log("Solicitud de creación de respaldo", {
      fecha_solicitud: fechaActual(),
    });

    setTimeout(() => {
      setProcesando(false);

      mostrarMensaje(
        "info",
        "La interfaz está lista, pero el respaldo real requiere conectar la API de Laravel.",
      );
    }, 500);
  };

  // Selección de un archivo local para una futura restauración.
  const seleccionarArchivo = (evento) => {
    const archivo = evento.target.files?.[0];

    setMensaje(null);
    setArchivoSeleccionado(null);

    if (!archivo) return;

    const extensionValida = /\.(sql|zip|gz)$/i.test(archivo.name);

    if (!extensionValida) {
      mostrarMensaje(
        "error",
        "Selecciona un archivo con extensión .sql, .zip o .gz.",
      );

      evento.target.value = "";
      return;
    }

    setArchivoSeleccionado(archivo);

    mostrarMensaje(
      "info",
      "Archivo seleccionado. Todavía no se ha enviado ni restaurado.",
    );
  };

  // La restauración real debe validarse y ejecutarse en el backend.
  const solicitarRestauracion = () => {
    if (!archivoSeleccionado) {
      mostrarMensaje("error", "Primero selecciona un archivo de respaldo.");
      return;
    }

    console.log("Solicitud de restauración", {
      nombre_archivo: archivoSeleccionado.name,
      tamano_bytes: archivoSeleccionado.size,
    });

    setMostrarConfirmacion(false);

    mostrarMensaje(
      "info",
      "Restauración no ejecutada. Es necesario conectar la API de Laravel para procesar el archivo de forma segura.",
    );
  };

  const descargarRespaldo = (respaldo) => {
    console.log("Solicitud de descarga de respaldo", {
      id_respaldo: respaldo.id,
      nombre_archivo: respaldo.nombre,
    });

    mostrarMensaje(
      "info",
      "La descarga estará disponible cuando Laravel genere y entregue el archivo real.",
    );
  };

  const tamanoArchivo = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <main className="space-y-6 text-slate-900">
      {/* Encabezado del módulo */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Administración</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Respaldo y restauración
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gestión de copias de seguridad de la base de datos.
          </p>
        </div>

        <button
          type="button"
          onClick={crearRespaldo}
          disabled={procesando}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {procesando ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Procesando...
            </>
          ) : (
            <>
              <span className="text-lg leading-none">+</span>
              Crear respaldo
            </>
          )}
        </button>
      </section>

      {/* Aviso de demostración */}
      <section className="flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <span className="mt-0.5 text-blue-600">ⓘ</span>

        <div>
          <p className="text-sm font-semibold text-blue-900">
            Modo de demostración
          </p>

          <p className="mt-1 text-sm leading-5 text-blue-800">
            Los registros mostrados son datos de ejemplo. La creación, descarga
            y restauración reales estarán disponibles al integrar las
            operaciones con la API de Laravel.
          </p>
        </div>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Respaldos registrados
            </p>

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
              ▤
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold">{respaldos.length}</p>

          <p className="mt-1 text-xs text-slate-400">
            Registros de demostración
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Último registro
            </p>

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
              ◷
            </span>
          </div>

          <p className="mt-3 text-xl font-bold">
            {respaldos.length > 0 ? respaldos[0].fecha.split(" ")[0] : "—"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Fecha del registro más reciente
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Estado de integración
            </p>

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg text-amber-600">
              ⚙
            </span>
          </div>

          <p className="mt-3 text-xl font-bold">Pendiente</p>

          <p className="mt-1 text-xs text-slate-400">
            API de respaldos de Laravel
          </p>
        </article>
      </section>

      {/* Historial de respaldos */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-base font-semibold">Historial de respaldos</h2>

          <p className="mt-1 text-sm text-slate-500">
            Consulta los registros de copias de seguridad.
          </p>
        </div>

        {respaldos.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium text-slate-700">
              No hay respaldos registrados
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Los registros aparecerán aquí cuando estén disponibles.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Archivo</th>
                  <th className="px-5 py-3 font-semibold">Fecha</th>
                  <th className="px-5 py-3 font-semibold">Tamaño</th>
                  <th className="px-5 py-3 font-semibold">Estado</th>
                  <th className="px-5 py-3 text-right font-semibold">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {respaldos.map((respaldo) => (
                  <tr
                    key={respaldo.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          ▤
                        </span>

                        <span className="font-medium text-slate-800">
                          {respaldo.nombre}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {respaldo.fecha}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {respaldo.tamano}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        {respaldo.estado}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => descargarRespaldo(respaldo)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                      >
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-slate-200 px-5 py-3">
          <p className="text-xs text-slate-400">
            Mostrando {respaldos.length} registros de ejemplo.
          </p>
        </div>
      </section>

      {/* Restauración */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h2 className="text-base font-semibold">Restaurar base de datos</h2>

          <p className="mt-1 text-sm text-slate-500">
            Selecciona un archivo de respaldo para preparar una solicitud de
            restauración.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
          <div className="mx-auto max-w-xl text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl text-slate-500 shadow-sm">
              ↑
            </span>

            <p className="mt-3 text-sm font-semibold text-slate-800">
              Selecciona un archivo de respaldo
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Formatos admitidos por la interfaz: .sql, .zip y .gz
            </p>

            <input
              ref={inputArchivo}
              type="file"
              accept=".sql,.zip,.gz"
              onChange={seleccionarArchivo}
              className="mt-4 block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:font-medium file:text-slate-700 file:shadow-sm hover:file:bg-slate-100"
            />

            {archivoSeleccionado && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-left">
                <p className="break-all text-sm font-medium text-slate-800">
                  {archivoSeleccionado.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Tamaño: {tamanoArchivo(archivoSeleccionado.size)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-start">
          <span className="text-lg text-amber-700">⚠</span>

          <div>
            <p className="text-sm font-semibold text-amber-900">
              Advertencia antes de restaurar
            </p>

            <p className="mt-1 text-sm leading-5 text-amber-800">
              Una restauración real puede reemplazar la información actual de la
              base de datos. Antes de ejecutarla, el backend deberá validar el
              archivo y aplicar las medidas de seguridad correspondientes.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              setArchivoSeleccionado(null);
              setMostrarConfirmacion(false);
              setMensaje(null);

              if (inputArchivo.current) {
                inputArchivo.current.value = "";
              }
            }}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Limpiar selección
          </button>

          <button
            type="button"
            disabled={!archivoSeleccionado}
            onClick={() => setMostrarConfirmacion(true)}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Restaurar respaldo
          </button>
        </div>
      </section>

      {/* Mensajes de la interfaz */}
      {mensaje && (
        <section
          role="status"
          className={`rounded-xl border p-4 text-sm ${
            mensaje.tipo === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-blue-200 bg-blue-50 text-blue-800"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p>{mensaje.texto}</p>

            <button
              type="button"
              onClick={() => setMensaje(null)}
              aria-label="Cerrar mensaje"
              className="shrink-0 font-semibold"
            >
              ×
            </button>
          </div>
        </section>
      )}

      {/* Confirmación de restauración */}
      {mostrarConfirmacion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) {
              setMostrarConfirmacion(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-confirmacion"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-600">
              ⚠
            </span>

            <h2
              id="titulo-confirmacion"
              className="mt-4 text-lg font-bold text-slate-900"
            >
              Confirmar restauración
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              ¿Deseas continuar con la solicitud de restauración del archivo{" "}
              <span className="font-semibold text-slate-800">
                {archivoSeleccionado?.name}
              </span>
              ?
            </p>

            <p className="mt-3 text-sm text-red-700">
              Esta acción no restaurará la base de datos desde esta interfaz de
              demostración.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setMostrarConfirmacion(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={solicitarRestauracion}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Confirmar solicitud
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Respaldo;
