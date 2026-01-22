import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { usePokemonFullDetails } from '../hooks/usePokemon';
import { useFavorites } from '../hooks/useStorage';
import { useSessionStorage } from '../hooks/useStorage';
import { STORAGE_KEYS } from '../utils/constants';
import {
  getPokemonImageUrl,
  getTypeColor,
  formatPokemonName,
  capitalize,
} from '../utils/helpers';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import StatsChart from '../components/pokemon/StatsChart';
import EvolutionChain from '../components/pokemon/EvolutionChain';
import '../styles/pages/PokemonDetail.scss';

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { pokemon, species, evolutionChain, loading, error } =
    usePokemonFullDetails(id);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [lastViewed, setLastViewed] = useSessionStorage(
    STORAGE_KEYS.LAST_VIEWED,
    []
  );
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Validate ID
  if (!id) {
    return (
      <div className="pokemon-detail">
        <div className="pokemon-detail__error">
          <p>Invalid Pokemon ID</p>
          <Button onClick={() => navigate('/')}>{t('common.back')}</Button>
        </div>
      </div>
    );
  }

  // Save to last viewed
  useEffect(() => {
    if (pokemon?.id && !lastViewed.includes(pokemon.id)) {
      setLastViewed((prev) => [...prev.slice(-4), pokemon.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.id]);

  const handleFavoriteToggle = () => {
    if (!pokemon) return;
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  if (loading) {
    return (
      <div className="pokemon-detail">
        <Loading text={t('common.loading')} />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="pokemon-detail">
        <div className="pokemon-detail__error">
          <p>{t('common.error')}</p>
          {error && <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{error}</p>}
          <Button onClick={() => navigate('/')}>{t('common.back')}</Button>
        </div>
      </div>
    );
  }

  if (!pokemon.id || !pokemon.name) {
    return (
      <div className="pokemon-detail">
        <div className="pokemon-detail__error">
          <p>Invalid Pokemon data</p>
          <Button onClick={() => navigate('/')}>{t('common.back')}</Button>
        </div>
      </div>
    );
  }

  const imageUrl = getPokemonImageUrl(pokemon.id);
  const pokemonName = formatPokemonName(pokemon.name);

  return (
    <motion.div
      className="pokemon-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="pokemon-detail__container">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="pokemon-detail__back"
        >
          ← {t('common.back')}
        </Button>

        <div className="pokemon-detail__header">
          <div className="pokemon-detail__image-section">
            <motion.img
              src={imageUrl}
              alt={pokemonName}
              className="pokemon-detail__image"
              onClick={() => setImageModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <Button
              variant={isFavorite(pokemon.id) ? 'danger' : 'primary'}
              onClick={handleFavoriteToggle}
              className="pokemon-detail__favorite-btn"
            >
              {isFavorite(pokemon.id)
                ? t('pokemon.removeFromFavorites')
                : t('pokemon.addToFavorites')}
            </Button>
          </div>

          <div className="pokemon-detail__info">
            <h1 className="pokemon-detail__name">{pokemonName}</h1>
            <p className="pokemon-detail__id">#{String(pokemon.id).padStart(3, '0')}</p>

            {species?.flavor_text_entries?.[0] && (
              <p className="pokemon-detail__description">
                {species.flavor_text_entries[0].flavor_text.replace(/\f/g, ' ')}
              </p>
            )}

            <div className="pokemon-detail__types">
              {pokemon.types?.map((type) => (
                <span
                  key={type.type.name}
                  className="pokemon-detail__type"
                  style={{ backgroundColor: getTypeColor(type.type.name) }}
                >
                  {formatPokemonName(type.type.name)}
                </span>
              ))}
            </div>

            <div className="pokemon-detail__stats-grid">
              <div className="pokemon-detail__stat">
                <span className="pokemon-detail__stat-label">{t('pokemon.height')}</span>
                <span className="pokemon-detail__stat-value">
                  {(pokemon.height / 10).toFixed(1)} m
                </span>
              </div>
              <div className="pokemon-detail__stat">
                <span className="pokemon-detail__stat-label">{t('pokemon.weight')}</span>
                <span className="pokemon-detail__stat-value">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </span>
              </div>
              <div className="pokemon-detail__stat">
                <span className="pokemon-detail__stat-label">
                  {t('pokemon.baseExperience')}
                </span>
                <span className="pokemon-detail__stat-value">
                  {pokemon.base_experience}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pokemon-detail__sections">
          <div className="pokemon-detail__section">
            <h2 className="pokemon-detail__section-title">{t('pokemon.abilities')}</h2>
            <div className="pokemon-detail__abilities">
              {pokemon.abilities?.map((ability) => (
                <span key={ability.ability.name} className="pokemon-detail__ability">
                  {formatPokemonName(ability.ability.name)}
                  {ability.is_hidden && (
                    <span className="pokemon-detail__ability-hidden">(Hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {pokemon.stats && (
            <div className="pokemon-detail__section">
              <StatsChart stats={pokemon.stats} />
            </div>
          )}

          {evolutionChain && (
            <div className="pokemon-detail__section">
              <EvolutionChain evolutionChain={evolutionChain} />
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        className="pokemon-detail__image-modal"
      >
        <img src={imageUrl} alt={pokemonName} className="pokemon-detail__modal-image" />
      </Modal>
    </motion.div>
  );
};

export default PokemonDetail;

