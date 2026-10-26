import { useEffect, useState } from 'react';
import { Toaster } from 'sileo';

const CONSULTA = '(max-width: 1023px)';

export default function ToasterResponsivo() {
  const [vistaMovil, setVistaMovil] = useState(
    () => window.matchMedia(CONSULTA).matches
  );

  useEffect(() => {
    const consultaMovil = window.matchMedia(CONSULTA);
    const actualizarVista = (evento) => setVistaMovil(evento.matches);

    consultaMovil.addEventListener('change', actualizarVista);
    return () => consultaMovil.removeEventListener('change', actualizarVista);
  }, []);

  return (
    <Toaster
      position={vistaMovil ? 'top-center' : 'top-right'}
      offset={vistaMovil ? { top: 20 } : { top: 20, right: 20 }}
      options={{
        fill: 'var(--sileo-fill)',
        roundness: 14,
        duration: 4200,
        styles: {
          title: 'app-toast-title',
          description: 'app-toast-description',
          badge: 'app-toast-badge',
        },
      }}
    />
  );
}
