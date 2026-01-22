import { useState, useMemo } from 'react';
import PokemonCard from './PokemonCard';
import Loading from '../common/Loading';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/components/PokemonList.scss';

const PokemonList = ({ pokemonList, loading, error, searchTerm = '' }) => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState('all');

  const filteredPokemon = useMemo(() => {
    let filtered = pokemonList;


    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      );
    }


    if (selectedType !== 'all') {
      filtered = filtered.filter((pokemon) =>
        pokemon.types?.some((type) => type.type.name === selectedType)
      );
    }

    return filtered;
  }, [pokemonList, searchTerm, selectedType]);


  const availableTypes = useMemo(() => {
    const types = new Set();
    pokemonList.forEach((pokemon) => {
      pokemon.types?.forEach((type) => {
        types.add(type.type.name);
      });
    });
    return Array.from(types).sort();
  }, [pokemonList]);

  if (loading) {
    return <Loading text={t('home.loading')} />;
  }

  if (error) {
    return (
      <div className="pokemon-list__error">
        <p>{t('home.error')}</p>
      </div>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className="pokemon-list__empty">
        <p>{t('home.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {availableTypes.length > 0 && (
        <div className="pokemon-list__filters">
          <button
            className={`pokemon-list__filter ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            {t('home.allTypes')}
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              className={`pokemon-list__filter ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
      <div className="pokemon-list__grid">
        {filteredPokemon.map((pokemon, index) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;

