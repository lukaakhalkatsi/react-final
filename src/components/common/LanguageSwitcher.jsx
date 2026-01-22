import { useLanguage } from '../../context/LanguageContext';
import '../../styles/components/LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { language, changeLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ka' : 'en');
  };

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={t('language.switch')}
      title={t('language.switch')}
    >
      <span className="language-switcher__text">
        {language === 'en' ? '🇬🇪' : '🇬🇧'}
      </span>
      <span className="language-switcher__label">
        {language === 'en' ? t('language.georgian') : t('language.english')}
      </span>
    </button>
  );
};

export default LanguageSwitcher;

