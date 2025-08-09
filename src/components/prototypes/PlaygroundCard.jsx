export default function PlaygroundCard() {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-10 h-[300px] w-[400px] mx-auto shadow-lg transition hover:scale-[1.02] duration-300 flex items-center justify-center">
      <button data-hover="true"
        className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium tracking-wide
        hover:scale-110 hover:bg-neutral-200 transition-all duration-200 ease-in-out cursor-none"
      >
        View Project →
      </button>
    </div>
  );
}