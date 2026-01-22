import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/components/ThemeToggle.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      className={`theme-toggle theme-toggle--${theme}`}
      onClick={toggleTheme}
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
    >
      <span className="theme-toggle__icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-toggle__text">
        {theme === 'light' ? t('theme.dark') : t('theme.light')}
      </span>
    </button>
  );
};

export default ThemeToggle;

