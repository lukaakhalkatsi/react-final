import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemonImageUrl, formatPokemonName } from '../../utils/helpers';
import { getPokemonDetails } from '../../services/pokemonApi';
import Loading from '../common/Loading';
import '../../styles/components/EvolutionChain.scss';

const EvolutionChain = ({ evolutionChain }) => {
  const navigate = useNavigate();
  const [evolutionData, setEvolutionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      if (!evolutionChain || !evolutionChain.chain) {
        setLoading(false);
        return;
      }

      try {
        const chain = [];
        let current = evolutionChain.chain;

        while (current && current.species) {
          try {
            const pokemonId = current.species.url.split('/').slice(-2, -1)[0];
            if (!pokemonId) break;
            
            const pokemonData = await getPokemonDetails(pokemonId);
            if (pokemonData) {
              chain.push({
                id: pokemonData.id,
                name: pokemonData.name,
                image: getPokemonImageUrl(pokemonData.id),
                minLevel: current.evolution_details?.[0]?.min_level || null,
              });
            }

            current = current.evolves_to?.[0];
          } catch (err) {
            console.error('Error fetching individual evolution:', err);
            break;
          }
        }

        setEvolutionData(chain);
      } catch (error) {
        console.error('Error fetching evolution data:', error);
        setEvolutionData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionData();
  }, [evolutionChain]);

  if (loading) {
    return <Loading size="small" />;
  }

  if (evolutionData.length <= 1) {
    return (
      <div className="evolution-chain">
        <p className="evolution-chain__empty">This Pokemon does not evolve</p>
      </div>
    );
  }

  return (
    <div className="evolution-chain">
      <h3 className="evolution-chain__title">Evolution Chain</h3>
      <div className="evolution-chain__list">
        {evolutionData.map((pokemon, index) => (
          <div key={pokemon.id} className="evolution-chain__item">
            {index > 0 && (
              <div className="evolution-chain__arrow">
                {pokemon.minLevel && (
                  <span className="evolution-chain__level">Lv. {pokemon.minLevel}</span>
                )}
                <span>→</span>
              </div>
            )}
            <div
              className="evolution-chain__pokemon"
              onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            >
              <img
                src={pokemon.image}
                alt={formatPokemonName(pokemon.name)}
                className="evolution-chain__image"
              />
              <p className="evolution-chain__name">
                {formatPokemonName(pokemon.name)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;

