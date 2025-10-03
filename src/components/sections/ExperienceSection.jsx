import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../context/LanguageContext';

export default function ExperienceSection() {
  const [ref, isVisible] = useScrollAnimation(100);
  const { t } = useLanguage();
  
  const experiences = [
    {
      period: t('experience.cids.period'),
      title: t('experience.cids.title'),
      company: t('experience.cids.company'),
      companyUrl: "http://www.cids.frc.utn.edu.ar/",
      description: t('experience.cids.description')
    },
    {
      period: t('experience.labsis.period'),
      title: t('experience.labsis.title'),
      company: t('experience.labsis.company'),
      companyUrl: "https://labsys.frc.utn.edu.ar/",
      description: t('experience.labsis.description')
    }
  ];

  return (
    <section 
      ref={ref}
      className={`flex flex-col space-y-4 mb-14 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      <h2 className="text-xl font-medium mb-8">{t('experience.title')}</h2>
      <div className="relative">
        {/* Timeline vertical */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700"></div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8">
              {/* Punto del timeline */}
              <div className="absolute left-[-5px] top-1 w-3 h-3 bg-neutral-300 dark:bg-neutral-700 border border-neutral-400 dark:border-neutral-600 rounded-full"></div>
              
              <div className="space-y-2">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">{exp.period}</p>
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{exp.title}</h3>
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                  <span className="text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white">{exp.company}</span>
                  <svg className="w-3 h-3 text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-[60ch]">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
