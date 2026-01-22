import { TYPE_COLORS } from './constants';

/**
 * Get Pokemon ID from URL
 * @param {string} url - Pokemon API URL
 * @returns {number} Pokemon ID
 */
export const getPokemonIdFromUrl = (url) => {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
};

/**
 * Get Pokemon image URL
 * @param {number|string} id - Pokemon ID
 * @returns {string} Image URL
 */
export const getPokemonImageUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

/**
 * Get Pokemon sprite URL
 * @param {number|string} id - Pokemon ID
 * @returns {string} Sprite URL
 */
export const getPokemonSpriteUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get type color
 * @param {string} type - Pokemon type
 * @returns {string} Color hex code
 */
export const getTypeColor = (type) => {
  return TYPE_COLORS[type.toLowerCase()] || TYPE_COLORS.normal;
};

/**
 * Format Pokemon name
 * @param {string} name - Pokemon name
 * @returns {string} Formatted name
 */
export const formatPokemonName = (name) => {
  return capitalize(name.replace(/-/g, ' '));
};

/**
 * Get stat percentage (max stat is 255)
 * @param {number} stat - Stat value
 * @returns {number} Percentage
 */
export const getStatPercentage = (stat) => {
  return Math.round((stat / 255) * 100);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

