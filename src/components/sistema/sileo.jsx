/* Notificaciones SILEO */
import { Toaster } from "sileo";

function Sileo() {
  return (
    <Toaster
      position="top-right"
      options={{
        fill: "#1e232a",
        roundness: 16,
        styles: {
          title: "text-white! font-semibold!",
          description: "text-slate-300!",
          badge: "bg-blue-500/20!",
          button: "bg-slate-700! hover:bg-slate-600!",
        },
      }}
    />
  );
}

export default Sileo;
