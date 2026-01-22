import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../hooks/useStorage';
import { useMultiplePokemonDetails } from '../hooks/usePokemon';
import PokemonCard from '../components/pokemon/PokemonCard';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import '../styles/pages/Favorites.scss';

const Favorites = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { favorites, removeFavorite, clearFavorites, count } = useFavorites();
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [loading, setLoading] = useState(true);


  const pokemonList = favorites.map((id) => ({
    name: `pokemon-${id}`,
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
  }));

  const { pokemonDetails } = useMultiplePokemonDetails(pokemonList);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoritePokemon([]);
      setLoading(false);
    } else if (pokemonDetails.length > 0 && pokemonDetails.length === favorites.length) {
      setFavoritePokemon(pokemonDetails);
      setLoading(false);
    } else if (pokemonDetails.length === 0 && favorites.length > 0) {
      setLoading(true);
    }
  }, [pokemonDetails, favorites.length]);

  const handleRemove = (pokemonId) => {
    removeFavorite(pokemonId);
    setFavoritePokemon((prev) => prev.filter((p) => p.id !== pokemonId));
  };

  if (loading) {
    return (
      <div className="favorites">
        <Loading text={t('common.loading')} />
      </div>
    );
  }

  return (
    <motion.div
      className="favorites"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="favorites__container">
        <div className="favorites__header">
          <h1 className="favorites__title">{t('favorites.title')}</h1>
          <div className="favorites__info">
            <p className="favorites__count">
              {t('favorites.teamCount').replace('{count}', count)}
            </p>
            {favorites.length > 0 && (
              <Button variant="danger" size="small" onClick={clearFavorites}>
                {t('favorites.clearAll')}
              </Button>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          <motion.div
            className="favorites__empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="favorites__empty-icon">⭐</div>
            <h2 className="favorites__empty-title">{t('favorites.empty')}</h2>
            <p className="favorites__empty-description">
              {t('favorites.emptyDescription')}
            </p>
            <Button onClick={() => navigate('/')}>{t('nav.home')}</Button>
          </motion.div>
        ) : (
          <>
            {count >= 6 && (
              <div className="favorites__max-warning">
                <p>{t('favorites.maxReached')}</p>
              </div>
            )}
            <AnimatePresence>
              <div className="favorites__grid">
                {favoritePokemon.map((pokemon, index) => (
                  <motion.div
                    key={pokemon.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="favorites__card-wrapper">
                      <PokemonCard pokemon={pokemon} index={index} />
                      <Button
                        variant="danger"
                        size="small"
                        className="favorites__remove-btn"
                        onClick={() => handleRemove(pokemon.id)}
                      >
                        {t('favorites.remove')}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Favorites;

