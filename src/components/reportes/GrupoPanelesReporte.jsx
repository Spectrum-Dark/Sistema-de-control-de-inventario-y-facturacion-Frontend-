import { Children, cloneElement, isValidElement, useState } from 'react';

// Componente contenedor 'GrupoPanelesReporte' para coordinar y gestionar de forma interactiva múltiples paneles de reportes, controlando el estado de visualización activa de manera dinámica mediante el clonado de elementos hijos.
export default function GrupoPanelesReporte({ children }) {
  // Estado local que almacena el índice del reporte activo actual (o 'null' si no hay ninguno seleccionado exclusivamente).
  const [reporteActivo, setReporteActivo] = useState(null);

  return (
    <div className="space-y-5">
      {/* Filtra los hijos válidos, los convierte en un array e inyecta las props de visibilidad y control de eventos a cada panel */}
      {Children.toArray(children)
        .filter(isValidElement)
        .map((panel, indice) =>
          cloneElement(panel, {
            visible: reporteActivo === null || reporteActivo === indice,
            onFiltroActivoChange: (activo) =>
              setReporteActivo((actual) =>
                activo ? indice : actual === indice ? null : actual
              ),
          })
        )}
    </div>
  );
}
