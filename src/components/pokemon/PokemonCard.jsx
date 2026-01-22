import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { getPokemonImageUrl, getTypeColor, formatPokemonName } from '../../utils/helpers';
import '../../styles/components/PokemonCard.scss';

const PokemonCard = ({ pokemon, index = 0 }) => {
  const navigate = useNavigate();
  const imageUrl = getPokemonImageUrl(pokemon.id);
  const pokemonName = formatPokemonName(pokemon.name);

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="pokemon-card" onClick={handleClick} hover>
        <div className="pokemon-card__image-wrapper">
          <img
            src={imageUrl}
            alt={pokemonName}
            className="pokemon-card__image"
            loading="lazy"
          />
        </div>
        <div className="pokemon-card__content">
          <div className="pokemon-card__header">
            <h3 className="pokemon-card__name">{pokemonName}</h3>
            <span className="pokemon-card__id">#{String(pokemon.id).padStart(3, '0')}</span>
          </div>
          <div className="pokemon-card__types">
            {pokemon.types?.map((type) => (
              <span
                key={type.type.name}
                className="pokemon-card__type"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {formatPokemonName(type.type.name)}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PokemonCard;

