import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSessionStorage } from '../../hooks/useStorage';
import { STORAGE_KEYS } from '../../utils/constants';
import { debounce } from '../../utils/helpers';
import '../../styles/components/SearchBar.scss';

const SearchBar = ({ onSearch, placeholder }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useSessionStorage(
    STORAGE_KEYS.SEARCH_HISTORY,
    []
  );

  const debouncedSearch = debounce((value) => {
    if (onSearch) {
      onSearch(value);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value && !searchHistory.includes(value)) {
      setSearchHistory([...searchHistory.slice(-4), value]);
    }
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder || t('home.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <span className="search-bar__icon">🔍</span>
      </div>
      {searchHistory.length > 0 && searchTerm === '' && (
        <div className="search-bar__history">
          {searchHistory.slice(-5).reverse().map((term, index) => (
            <button
              key={index}
              className="search-bar__history-item"
              onClick={() => handleHistoryClick(term)}
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

