import { useState, useEffect } from 'react';
import {
  getPokemonList,
  getPokemonDetails,
  getPokemonSpecies,
  getEvolutionChain,
} from '../services/pokemonApi';
import { getPokemonIdFromUrl } from '../utils/helpers';


export const usePokemonList = (limit = 20, offset = 0) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonList(limit, offset);
        setPokemonList(data.results);
        setHasMore(data.next !== null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [limit, offset]);

  return { pokemonList, loading, error, hasMore };
};


export const usePokemonDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  return { pokemon, loading, error };
};


export const usePokemonFullDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchFullDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pokemonData, speciesData] = await Promise.all([
          getPokemonDetails(id),
          getPokemonSpecies(id),
        ]);

        setPokemon(pokemonData);
        setSpecies(speciesData);

        // Fetch evolution chain if available
        if (speciesData.evolution_chain?.url) {
          try {
            const evolutionData = await getEvolutionChain(
              speciesData.evolution_chain.url
            );
            setEvolutionChain(evolutionData);
          } catch (evolutionErr) {
            console.error('Error fetching evolution chain:', evolutionErr);
            // Don't fail the whole request if evolution chain fails
            setEvolutionChain(null);
          }
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch Pokemon details';
        console.error('Error fetching Pokemon full details:', err);
        setError(errorMessage);
        setPokemon(null);
        setSpecies(null);
        setEvolutionChain(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();
  }, [id]);

  return { pokemon, species, evolutionChain, loading, error };
};


export const useMultiplePokemonDetails = (pokemonList) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      setLoading(false);
      return;
    }

    const fetchAllDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await Promise.all(
          pokemonList.map((pokemon) => {
            const id = getPokemonIdFromUrl(pokemon.url);
            return getPokemonDetails(id);
          })
        );
        setPokemonDetails(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, [pokemonList]);

  return { pokemonDetails, loading, error };
};

