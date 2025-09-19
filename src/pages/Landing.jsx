import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HeroSection from "../components/sections/HeroSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ComponentsSection from "../components/sections/ComponentsSection";

export default function Landing() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white overflow-x-hidden pt-28 md:pt-28 mt-1">
        <div className="mx-auto max-w-[850px] px-5 py-3">

        <HeroSection />

        <ExperienceSection />

        <ProjectsSection />

        <ComponentsSection />

         {/* Footer */}
         <footer className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8 mb-20">
           <p>© 2025 Francisco López Mora.</p>
         </footer>
        </div>
        
        <BottomNav />
      </main>
    </>
  );
}
