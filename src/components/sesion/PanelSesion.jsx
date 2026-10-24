import { useLayoutEffect, useState } from "react";
import { Moon, Package, ShieldCheck, Sun } from "lucide-react";

const CLAVE_TEMA = "tema_interfaz";

export default function PanelSesion({ children, etiqueta, titulo, descripcion }) {
  const [temaOscuro, setTemaOscuro] = useState(() => localStorage.getItem(CLAVE_TEMA) === "oscuro");

  // Comparte la preferencia de tema con el resto del sistema.
  useLayoutEffect(() => {
    document.documentElement.dataset.tema = temaOscuro ? "oscuro" : "claro";
    localStorage.setItem(CLAVE_TEMA, temaOscuro ? "oscuro" : "claro");
  }, [temaOscuro]);

  return (
    <main className="auth-layout">
      <button
        className="auth-theme-toggle"
        type="button"
        onClick={() => setTemaOscuro((actual) => !actual)}
        aria-label={temaOscuro ? "Activar modo claro" : "Activar modo oscuro"}
        title={temaOscuro ? "Modo claro" : "Modo oscuro"}
      >
        {temaOscuro ? <Sun size={17} /> : <Moon size={17} />}
        <span>{temaOscuro ? "Modo claro" : "Modo oscuro"}</span>
      </button>

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
