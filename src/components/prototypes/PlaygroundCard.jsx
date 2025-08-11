export default function PlaygroundCard() {
  return (
    <div
      className="
        w-full max-w-sm sm:max-w-md md:max-w-lg
        h-56 sm:h-64 md:h-72
        bg-white/5 border border-white/10 backdrop-blur-md
        rounded-2xl md:rounded-3xl
        p-6 sm:p-8 md:p-10
        shadow-lg
        transition-transform duration-300
        md:hover:scale-[1.02]
        overflow-hidden
        flex items-center justify-center
      "
    >
      <button
        data-hover="true"
        className="
          px-5 sm:px-6 py-2.5 sm:py-3
          rounded-full bg-white text-black text-sm font-medium tracking-wide
          transition-all duration-200 ease-in-out
          md:hover:scale-110 md:hover:bg-neutral-200
          md:cursor-none
        "
      >
        View Project →
      </button>
    </div>
  );
}
