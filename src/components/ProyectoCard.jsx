export default function ProyectoCard({ titulo, descripcion, gif, essay, proto }) {
  return (
    <div className="bg-white rounded-xl  border border-neutral-200 transition-all duration-300 break-inside-avoid p-4">
      {gif?.endsWith(".mp4") ? (
        <video
          src={gif}
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-contain mb-2 rounded-md"
        />
      ) : (
        <img
          src={gif}
          alt={titulo}
          className="w-full object-contain mb-2 rounded-md"
        />
      )}


      <div className=" flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold text-neutral-900">{titulo}</h2>
          <p className="text-sm text-neutral-600">{descripcion}</p>
          <p className="text-xs text-neutral-400 mt-1">Junio 2025</p>

        </div>

        {(essay || proto) && (
          <div className="mt-4 space-y-2">
            {essay && (
              <div className="text-sm bg-neutral-800 text-center text-white/80 py-2 rounded-lg border border-white/10">
                {essay}
              </div>
            )}
            {proto && (
              <div className="text-sm bg-neutral-800 text-center text-white/80 py-2 rounded-lg border border-white/10">
                {proto}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
