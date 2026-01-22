import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { usePokemonList, useMultiplePokemonDetails } from '../hooks/usePokemon';
import { useSessionStorage } from '../hooks/useStorage';
import { STORAGE_KEYS, POKEMON_PER_PAGE } from '../utils/constants';
import SearchBar from '../components/common/SearchBar';
import PokemonList from '../components/pokemon/PokemonList';
import Button from '../components/common/Button';
import '../styles/pages/Home.scss';

const Home = () => {
  const { t } = useLanguage();
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [allPokemon, setAllPokemon] = useState([]);
  const [filters, setFilters] = useSessionStorage(STORAGE_KEYS.FILTERS, {});

  const { pokemonList, loading, error, hasMore } = usePokemonList(
    POKEMON_PER_PAGE,
    offset
  );
  const { pokemonDetails, loading: detailsLoading } = useMultiplePokemonDetails(
    pokemonList
  );

  useEffect(() => {
    if (pokemonDetails.length > 0) {
      setAllPokemon((prev) => {
        const newPokemon = pokemonDetails.filter(
          (p) => !prev.find((existing) => existing.id === p.id)
        );
        return [...prev, ...newPokemon];
      });
    }
  }, [pokemonDetails]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setOffset((prev) => prev + POKEMON_PER_PAGE);
    }
  };

  const displayPokemon = searchTerm
    ? allPokemon.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pokemon.id.toString().includes(searchTerm)
      )
    : allPokemon;

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="home__container">
        <h1 className="home__title">{t('home.title')}</h1>

        <div className="home__search">
          <SearchBar onSearch={handleSearch} />
        </div>

        <PokemonList
          pokemonList={displayPokemon}
          loading={loading || detailsLoading}
          error={error}
          searchTerm={searchTerm}
        />

        {hasMore && !searchTerm && (
          <div className="home__load-more">
            <Button onClick={handleLoadMore} disabled={loading || detailsLoading}>
              {t('home.loadMore')}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;

