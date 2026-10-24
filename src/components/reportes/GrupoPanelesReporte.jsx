import { Children, cloneElement, isValidElement, useState } from "react";

export default function GrupoPanelesReporte({ children }) {
  const [reporteActivo, setReporteActivo] = useState(null);

  return (
    <div className="space-y-5">
      {Children.toArray(children).filter(isValidElement).map((panel, indice) =>
        cloneElement(panel, {
          visible: reporteActivo === null || reporteActivo === indice,
          onFiltroActivoChange: (activo) => setReporteActivo((actual) =>
            activo ? indice : actual === indice ? null : actual,
          ),
        }),
      )}
    </div>
  );
}
