import DarkModeToggle from "../components/DarkModeToggle";
import BottomNav from "../components/BottomNav";

export default function Proyectos() {
  return (
    <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors overflow-x-hidden pb-16">
      <div className="mx-auto max-w-[980px] px-5 py-6">
        <div className="flex items-center justify-end mb-4">
          <DarkModeToggle />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}


