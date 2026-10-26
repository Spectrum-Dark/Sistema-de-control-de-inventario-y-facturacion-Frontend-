import { useLayoutEffect } from 'react';
import { Package, ShieldCheck } from 'lucide-react';

const CLAVE_TEMA = 'tema_interfaz';

// Componente contenedor 'PanelSesion' para estructurar el diseño visual de las pantallas de autenticación (login y registro), sincronizando el tema de interfaz y mostrando la marca corporativa y notas de seguridad.
export default function PanelSesion({
  children,
  etiqueta,
  titulo,
  descripcion,
}) {
  // Sincroniza y aplica la preferencia de tema guardada en localStorage (claro u oscuro) directamente sobre el elemento raíz antes de renderizar.
  useLayoutEffect(() => {
    document.documentElement.dataset.tema =
      localStorage.getItem(CLAVE_TEMA) === 'oscuro' ? 'oscuro' : 'claro';
  }, []);

  return (
    <main className="auth-layout">
      <section className="auth-card" aria-labelledby="auth-title">
        {/* Cabecera con el logotipo e identidad corporativa del sistema de inventario y facturación */}
        <header className="auth-brand">
          <span className="auth-brand-icon">
            <Package size={22} strokeWidth={2} />
          </span>
          <span className="auth-brand-name">
            Repuestos<span> · </span>Gestión
          </span>
          <span className="auth-brand-caption">INVENTARIO Y FACTURACIÓN</span>
        </header>

        {/* Sección de título y subtítulo dinámico para la vista de autenticación */}
        <div className="auth-form-heading">
          <span className="auth-form-eyebrow">{etiqueta}</span>
          <h1 id="auth-title">{titulo}</h1>
          <p>{descripcion}</p>
        </div>

        {/* Contenido dinámico principal (formulario de inicio de sesión o registro) */}
        {children}

        {/* Pie de la tarjeta con nota informativa de acceso protegido */}
        <footer className="auth-security-note">
          <ShieldCheck size={15} />
          <span>Acceso protegido · Sistema de gestión de repuestos</span>
        </footer>
      </section>

      {/* Nota de copyright inferior con año actual dinámico */}
      <p className="auth-copyright">
        © {new Date().getFullYear()} Sistema de gestión de repuestos
      </p>
    </main>
  );
}
