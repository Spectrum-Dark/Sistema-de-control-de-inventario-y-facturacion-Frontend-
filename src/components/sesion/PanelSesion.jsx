import { useLayoutEffect } from "react";
import { Package, ShieldCheck } from "lucide-react";

const CLAVE_TEMA = "tema_interfaz";

export default function PanelSesion({ children, etiqueta, titulo, descripcion }) {
  // Conserva en el login la preferencia elegida desde la aplicación principal.
  useLayoutEffect(() => {
    document.documentElement.dataset.tema = localStorage.getItem(CLAVE_TEMA) === "oscuro" ? "oscuro" : "claro";
  }, []);

  return (
    <main className="auth-layout">
      <section className="auth-card" aria-labelledby="auth-title">
        <header className="auth-brand">
          <span className="auth-brand-icon"><Package size={22} strokeWidth={2} /></span>
          <span className="auth-brand-name">Repuestos<span> · </span>Gestión</span>
          <span className="auth-brand-caption">INVENTARIO Y FACTURACIÓN</span>
        </header>

        <div className="auth-form-heading">
          <span className="auth-form-eyebrow">{etiqueta}</span>
          <h1 id="auth-title">{titulo}</h1>
          <p>{descripcion}</p>
        </div>

        {children}

        <footer className="auth-security-note">
          <ShieldCheck size={15} />
          <span>Acceso protegido · Sistema de gestión de repuestos</span>
        </footer>
      </section>

      <p className="auth-copyright">© {new Date().getFullYear()} Sistema de gestión de repuestos</p>
    </main>
  );
}
