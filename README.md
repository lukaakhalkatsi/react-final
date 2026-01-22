# PokeExplorer - Pokemon Application

A modern, responsive Pokemon application built with React, featuring Pokemon browsing, detailed views, favorites management, dark/light themes, and multi-lingual support (English/Georgian).

![Pokemon App](https://img.shields.io/badge/React-19.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

### Core Features
- **3+ Pages**: Home, Pokemon Detail, and Favorites pages
- **React Router**: Seamless navigation between pages
- **PokeAPI Integration**: Real-time Pokemon data using Axios
- **Storage Management**: 
  - `localStorage` for favorites/team persistence
  - `sessionStorage` for search history and filters
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Animations & Modals**: Smooth transitions using Framer Motion

### Bonus Features
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Multi-lingual Support**: English and Georgian (ქართული) translations
- **SASS/SCSS**: Modern styling with SASS preprocessor
- **Custom Hooks**: Reusable hooks for Pokemon data, theme, language, and storage
- **Context API**: Global state management for theme and language

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-final
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Button, Card, Modal, Loading, SearchBar, ThemeToggle, LanguageSwitcher
│   ├── pokemon/        # PokemonCard, PokemonList, StatsChart, EvolutionChain
│   └── layout/         # Header, Footer
├── pages/              # Page components
│   ├── Home.jsx        # Pokemon list with search/pagination
│   ├── PokemonDetail.jsx
│   └── Favorites.jsx   # Saved Pokemon team
├── hooks/              # Custom hooks
│   ├── usePokemon.js   # Pokemon data fetching
│   └── useStorage.js   # localStorage/sessionStorage helpers
├── context/            # React Context
│   ├── ThemeContext.jsx
│   └── LanguageContext.jsx
├── services/           # API services
│   └── pokemonApi.js   # Axios instance & API calls
├── utils/              # Utilities
│   ├── constants.js    # API endpoints, configs
│   └── helpers.js      # Helper functions
├── styles/             # Global styles
│   ├── main.scss       # Main SASS file
│   ├── _variables.scss # SASS variables
│   ├── _mixins.scss    # SASS mixins
│   ├── _animations.scss # Animation keyframes
│   ├── components/     # Component styles
│   └── pages/          # Page styles
├── locales/            # Translation files
│   ├── en.json
│   └── ka.json         # Georgian translations
└── assets/             # Images, icons
```

## 🎯 Pages

### 1. Home Page (`/`)
- Pokemon grid/list with pagination
- Search functionality with history
- Filter by Pokemon type
- Load more button for infinite scroll
- Search history saved in sessionStorage

### 2. Pokemon Detail Page (`/pokemon/:id`)
- Complete Pokemon information
- Stats visualization with progress bars
- Evolution chain display
- Add/remove from favorites
- Image modal for full-size view
- Abilities and type information

### 3. Favorites Page (`/favorites`)
- Display saved Pokemon from localStorage
- Team management (max 6 Pokemon)
- Remove Pokemon from favorites
- Clear all favorites
- Empty state with helpful message

## 🎨 Features in Detail

### Theme System
- Toggle between light and dark themes
- Theme preference saved in localStorage
- Smooth theme transitions
- CSS variables for easy theming

### Language Support
- English (en) - Default
- Georgian (ka) - ქართული
- Language preference saved in localStorage
- All UI text translated

### Storage Usage
- **localStorage**:
  - `pokemon_favorites`: Array of favorite Pokemon IDs
  - `pokemon_theme`: Current theme ('light' or 'dark')
  - `pokemon_language`: Current language ('en' or 'ka')
  
- **sessionStorage**:
  - `pokemon_search_history`: Recent search terms
  - `pokemon_last_viewed`: Recently viewed Pokemon IDs
  - `pokemon_filters`: Active filters

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
- Tested on Chrome DevTools device presets

## 🛠️ Technologies Used

- **React 19** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client for API calls
- **Framer Motion** - Animations
- **SASS/SCSS** - CSS preprocessor
- **PokeAPI** - Pokemon data source

## 📡 API Integration

The app uses [PokeAPI](https://pokeapi.co/) for Pokemon data:

- `GET /api/v2/pokemon` - Get Pokemon list
- `GET /api/v2/pokemon/{id}` - Get Pokemon details
- `GET /api/v2/pokemon-species/{id}` - Get Pokemon species data
- `GET /api/v2/type/{type}` - Get Pokemon by type

## 🎨 Styling

The project uses SASS/SCSS with:
- Variables for colors, spacing, typography
- Mixins for responsive breakpoints and common patterns
- Component-scoped styles
- CSS variables for theme support
- Custom scrollbar styling

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Code Standards

- Functional components only
- React Hooks for state management
- Custom hooks for reusable logic
- Context API for global state
- Proper file naming conventions
- Component-based architecture
- Responsive design patterns

## 🎯 Future Enhancements

- [ ] Pokemon comparison feature
- [ ] Advanced filtering options
- [ ] Pokemon battle simulator
- [ ] More language support
- [ ] PWA support
- [ ] Offline mode

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokemon data
- React team for the amazing framework
- All Pokemon fans and developers

## 👨‍💻 Development

### Adding New Features

1. Create components in appropriate folders
2. Add styles in `src/styles/components/` or `src/styles/pages/`
3. Update translations in `src/locales/`
4. Follow existing code patterns

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Made with ❤️ using React and PokeAPI
