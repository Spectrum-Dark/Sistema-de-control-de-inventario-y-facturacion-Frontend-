import { useState } from "react";
import { Package, Barcode, Loader2 } from "lucide-react";
import { sileo } from "sileo";
import Modal from "../compartido/Modal";
import CampoFormulario from "../compartido/CampoFormulario";
import CampoSelect from "../compartido/CampoSelect";
import CampoTextarea from "../compartido/CampoTextarea";
import {
  aNumeroONull,
  obtenerCambios,
} from "../../utils/compartido/formulario";
import {
  crearProducto,
  actualizarProducto,
} from "../../services/productos/productosService";

export default function ModalProducto({
  producto,
  categorias,
  onCerrar,
  onGuardado,
}) {
  const esEdicion = Boolean(producto);

  const [form, setForm] = useState({
    id_categoria: String(producto?.id_categoria ?? ""),
    codigo_producto: producto?.codigo_producto ?? "",
    nombre_producto: producto?.nombre_producto ?? "",
    descripcion: producto?.descripcion ?? "",
    precio_compra: producto?.precio_compra ?? "",
    precio_venta: producto?.precio_venta ?? "",
    existencia_minima: producto?.existencia_minima ?? 0,
    existencia_maxima: producto?.existencia_maxima ?? "",
    estado: producto?.estado ?? "Activo",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Para un producto nuevo, solo categorías activas; al editar se incluye la actual
  const opcionesCategoria = categorias.filter(
    (c) => c.estado === "Activa" || c.id_categoria === producto?.id_categoria,
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valores = {
      id_categoria: Number(form.id_categoria),
      codigo_producto: form.codigo_producto.trim(),
      nombre_producto: form.nombre_producto.trim(),
      descripcion: form.descripcion.trim() || null,
      precio_compra: Number(form.precio_compra),
      precio_venta: Number(form.precio_venta),
      existencia_minima: Number(form.existencia_minima || 0),
      existencia_maxima: aNumeroONull(form.existencia_maxima),
    };

    if (
      valores.existencia_maxima !== null &&
      valores.existencia_maxima < valores.existencia_minima
    ) {
      setError(
        "La existencia máxima no puede ser menor que la existencia mínima.",
      );
      return;
    }

    let datos = valores;

    if (esEdicion) {
      // Al editar, solo se envía lo que cambió
      const original = {
        id_categoria: Number(producto.id_categoria),
        codigo_producto: producto.codigo_producto,
        nombre_producto: producto.nombre_producto,
        descripcion: producto.descripcion ?? null,
        precio_compra: Number(producto.precio_compra),
        precio_venta: Number(producto.precio_venta),
        existencia_minima: Number(producto.existencia_minima ?? 0),
        existencia_maxima: aNumeroONull(producto.existencia_maxima),
      };
      datos = obtenerCambios(valores, original);
      if (form.estado !== producto.estado) datos.estado = form.estado;

      if (Object.keys(datos).length === 0) {
        setError("No hay cambios para guardar.");
        return;
      }
    }

    setCargando(true);

    try {
      const respuesta = esEdicion
        ? await actualizarProducto(producto.id_producto, datos)
        : await crearProducto(datos);

      sileo.success({
        title: esEdicion ? "Producto actualizado" : "Producto registrado",
        description: respuesta.message,
      });
      onGuardado(respuesta.datos, !esEdicion);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal
      titulo={esEdicion ? "Editar producto" : "Nuevo producto"}
      onCerrar={onCerrar}
      bloqueado={cargando}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CampoSelect
          id="id_categoria"
          label="Categoría"
          value={form.id_categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          {opcionesCategoria.map((c) => (
            <option key={c.id_categoria} value={c.id_categoria}>
              {c.nombre_categoria}
            </option>
          ))}
        </CampoSelect>

        <CampoFormulario
          id="codigo_producto"
          label="Código"
          icono={Barcode}
          type="text"
          placeholder="Ej: FR-0001"
          maxLength={50}
          value={form.codigo_producto}
          onChange={handleChange}
          required
        />

        <CampoFormulario
          id="nombre_producto"
          label="Nombre del producto"
          icono={Package}
          type="text"
          placeholder="Ej: Pastillas de freno delanteras"
          maxLength={150}
          value={form.nombre_producto}
          onChange={handleChange}
          required
        />

        <CampoTextarea
          id="descripcion"
          label="Descripción (opcional)"
          placeholder="Detalles del producto"
          value={form.descripcion}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <CampoFormulario
            id="precio_compra"
            label="Precio de compra"
            type="number"
            min={0}
            step="0.01"
            value={form.precio_compra}
            onChange={handleChange}
            required
          />
          <CampoFormulario
            id="precio_venta"
            label="Precio de venta"
            type="number"
            min={0}
            step="0.01"
            value={form.precio_venta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CampoFormulario
            id="existencia_minima"
            label="Existencia mínima"
            type="number"
            min={0}
            step="1"
            value={form.existencia_minima}
            onChange={handleChange}
          />
          <CampoFormulario
            id="existencia_maxima"
            label="Existencia máxima"
            type="number"
            min={0}
            step="1"
            placeholder="Opcional"
            value={form.existencia_maxima}
            onChange={handleChange}
          />
        </div>

        {esEdicion && (
          <CampoSelect
            id="estado"
            label="Estado"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </CampoSelect>
        )}

        <p className="text-xs text-slate-500">
          La existencia no se edita aquí: la controla el inventario.
        </p>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={cargando}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando && <Loader2 size={16} className="animate-spin" />}
            {cargando
              ? "Guardando..."
              : esEdicion
                ? "Guardar cambios"
                : "Registrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
