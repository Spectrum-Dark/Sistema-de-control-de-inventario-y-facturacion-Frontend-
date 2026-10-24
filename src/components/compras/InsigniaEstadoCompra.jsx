import InsigniaEstado from '../compartido/InsigniaEstado';

// Componente envoltorio especializado (InsigniaEstadoCompra) para renderizar el estado específico de una compra utilizando la insignia base general.
export default function InsigniaEstadoCompra({ estado }) {
  return <InsigniaEstado estado={estado} />;
}
