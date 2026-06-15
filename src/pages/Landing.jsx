import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HeroSection from "../components/sections/HeroSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ComponentsSection from "../components/sections/ComponentsSection";
import { useLanguage } from "../context/LanguageContext";

export default function Landing() {
  const { t } = useLanguage();
  
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden bg-neutral-50 pt-24 text-black dark:bg-neutral-900 dark:text-white sm:pt-28">
        <div className="mx-auto max-w-[960px] px-4 py-4 sm:px-6">

        <HeroSection />

        <ExperienceSection />

        <ProjectsSection />

        <ComponentsSection />

         {/* Footer */}
         <footer className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8 mb-20">
           <p>{t('footer.copyright')}</p>
         </footer>
        </div>
        
        <BottomNav />
      </main>
    </>
  );
}
