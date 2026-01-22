import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../utils/constants';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Get Pokemon list with pagination
 * @param {number} limit - Number of Pokemon per page
 * @param {number} offset - Offset for pagination
 * @returns {Promise} Pokemon list
 */
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await api.get(ENDPOINTS.POKEMON, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get Pokemon by ID or name
 * @param {number|string} id - Pokemon ID or name
 * @returns {Promise} Pokemon data
 */
export const getPokemonDetails = async (id) => {
  try {
    const response = await api.get(`${ENDPOINTS.POKEMON}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get Pokemon species data (includes evolution chain)
 * @param {number|string} id - Pokemon ID or name
 * @returns {Promise} Pokemon species data
 */
export const getPokemonSpecies = async (id) => {
  try {
    const response = await api.get(`${ENDPOINTS.POKEMON_SPECIES}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get Pokemon by type
 * @param {string} type - Pokemon type
 * @returns {Promise} Pokemon list by type
 */
export const getPokemonByType = async (type) => {
  try {
    const response = await api.get(`${ENDPOINTS.TYPE}/${type}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get evolution chain
 * @param {string} url - Evolution chain URL
 * @returns {Promise} Evolution chain data
 */
export const getEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;

