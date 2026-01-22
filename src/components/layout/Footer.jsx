import { useLanguage } from '../../context/LanguageContext';
import '../../styles/components/Footer.scss';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          {t('common.loading')} - Pokemon data from{' '}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            PokeAPI
          </a>
        </p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} PokeExplorer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

