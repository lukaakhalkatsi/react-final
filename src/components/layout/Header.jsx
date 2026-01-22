import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../hooks/useStorage';
import ThemeToggle from '../common/ThemeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher';
import '../../styles/components/Header.scss';

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { count } = useFavorites();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">⚡</span>
          <span className="header__logo-text">PokeExplorer</span>
        </Link>

        <nav className="header__nav">
          <Link
            to="/"
            className={`header__nav-link ${isActive('/') ? 'active' : ''}`}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/favorites"
            className={`header__nav-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            {t('nav.favorites')}
            {count > 0 && <span className="header__badge">{count}</span>}
          </Link>
        </nav>

        <div className="header__controls">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;

