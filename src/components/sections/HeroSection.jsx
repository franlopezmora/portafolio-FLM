import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../context/LanguageContext';

export default function HeroSection() {
  const [ref, isVisible] = useScrollAnimation(0);
  const { t } = useLanguage();

  return (
    <section 
      ref={ref}
      className={`mb-16 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Bio */}
      <div className="text-left mb-8">
        <h1 
          className="text-2xl sm:text-3xl font-normal mb-4"
          dangerouslySetInnerHTML={{ __html: t('hero.title') }}
        />
        
        <div className="space-y-3 text-neutral-600 dark:text-neutral-300 max-w-[60ch]">
          <p>{t('hero.description1')}</p>
          <p>{t('hero.description2')}</p>
        </div>
      </div>
    </section>
  );
}
