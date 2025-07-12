import React, { useState, useMemo } from 'react';

// Material-UI Icons
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

import './LocalInsightPage.css';

const localInsightsData = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    popularity: 120,
    crowdLevel: 'High',
    offers: '10% off on smartphones',
    rating: 4.5,
    distance: '0.2 km',
    waitTime: '15 min',
    category: 'technology',
    trending: true,
    lastUpdated: '2 min ago'
  },
  {
    id: 'bakery',
    name: 'Bakery',
    icon: '🍞',
    popularity: 75,
    crowdLevel: 'Medium',
    offers: null,
    rating: 4.8,
    distance: '0.5 km',
    waitTime: '5 min',
    category: 'food',
    trending: false,
    lastUpdated: '10 min ago'
  },
  {
    id: 'produce',
    name: 'Fresh Produce',
    icon: '🥬',
    popularity: 90,
    crowdLevel: 'Low',
    offers: 'Buy 1 Get 1 Free on select veggies',
    rating: 4.3,
    distance: '0.3 km',
    waitTime: '2 min',
    category: 'food',
    trending: true,
    lastUpdated: '5 min ago'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    popularity: 40,
    crowdLevel: 'Low',
    offers: null,
    rating: 4.2,
    distance: '0.8 km',
    waitTime: '3 min',
    category: 'entertainment',
    trending: false,
    lastUpdated: '15 min ago'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: '👗',
    popularity: 85,
    crowdLevel: 'Medium',
    offers: 'Summer sale 20% off',
    rating: 4.6,
    distance: '0.4 km',
    waitTime: '8 min',
    category: 'fashion',
    trending: true,
    lastUpdated: '3 min ago'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    icon: '💊',
    popularity: 60,
    crowdLevel: 'Low',
    offers: 'Free health checkup',
    rating: 4.4,
    distance: '0.6 km',
    waitTime: '4 min',
    category: 'health',
    trending: false,
    lastUpdated: '8 min ago'
  },
  {
    id: 'coffee',
    name: 'Coffee Shop',
    icon: '☕',
    popularity: 95,
    crowdLevel: 'High',
    offers: 'Buy 2 Get 1 Free',
    rating: 4.7,
    distance: '0.1 km',
    waitTime: '12 min',
    category: 'food',
    trending: true,
    lastUpdated: '1 min ago'
  },
  {
    id: 'bookstore',
    name: 'Bookstore',
    icon: '📚',
    popularity: 35,
    crowdLevel: 'Low',
    offers: null,
    rating: 4.1,
    distance: '0.7 km',
    waitTime: '1 min',
    category: 'education',
    trending: false,
    lastUpdated: '20 min ago'
  }
];

const LocalInsightsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['all', 'food', 'technology', 'fashion', 'health', 'entertainment', 'education'];

  const filteredAndSortedData = useMemo(() => {
    let filtered = localInsightsData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'waitTime':
          return parseInt(a.waitTime) - parseInt(b.waitTime);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const getCrowdClassName = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'crowd-low';
      case 'medium': return 'crowd-medium';
      case 'high': return 'crowd-high';
      default: return 'crowd-default';
    }
  };

  const getPopularityClassName = (popularity) => {
    if (popularity >= 100) return 'popularity-high';
    if (popularity >= 70) return 'popularity-medium';
    return 'popularity-low';
  };

  return (
    <div className="local-insights-container">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">Local Insights</h1>
          <p className="subtitle">Discover what's happening around you</p>
        </div>

        {/* Search and Filters */}
        <div className="controls-panel">
          <div className="controls-grid">
            {/* Search Bar */}
            <div className="search-wrapper">
              <div className="search-container">
                <SearchIcon className="search-icon" fontSize="small" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-wrapper">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="filter-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="rating">Sort by Rating</option>
                <option value="distance">Sort by Distance</option>
                <option value="waitTime">Sort by Wait Time</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredAndSortedData.length} location{filteredAndSortedData.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Insights Grid/List */}
        <div className={`insights-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
          {filteredAndSortedData.map((item) => (
            <div key={item.id} className={`insight-card ${viewMode === 'list' ? 'list-card' : 'grid-card'}`}>
              {viewMode === 'grid' ? (
                <div className="card-content">
                  {/* Card Header */}
                  <div className="card-header">
                    <div className="card-info">
                      <div className="card-icon">{item.icon}</div>
                      <div className="card-details">
                        <h3 className="card-name">{item.name}</h3>
                        <div className="card-distance">
                          <LocationOnIcon fontSize="small" />
                          <span>{item.distance}</span>
                        </div>
                      </div>
                    </div>
                    {item.trending && (
                      <div className="trending-badge">
                        Trending
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="rating-section">
                    <StarIcon className="star-icon" fontSize="small" />
                    <span className="rating-value">{item.rating}</span>
                    <span className="rating-label">rating</span>
                  </div>

                  {/* Popularity */}
                  <div className="popularity-section">
                    <TrendingUpIcon className={`popularity-icon ${getPopularityClassName(item.popularity)}`} fontSize="small" />
                    <span className="popularity-text">
                      <span className={`popularity-value ${getPopularityClassName(item.popularity)}`}>
                        {item.popularity}
                      </span> visitors
                    </span>
                  </div>

                  {/* Crowd Level */}
                  <div className="crowd-section">
                    <PeopleIcon className="crowd-icon" fontSize="small" />
                    <span className={`crowd-badge ${getCrowdClassName(item.crowdLevel)}`}>
                      {item.crowdLevel} crowd
                    </span>
                  </div>

                  {/* Wait Time */}
                  <div className="wait-section">
                    <AccessTimeIcon className="wait-icon" fontSize="small" />
                    <span className="wait-text">~{item.waitTime} wait</span>
                  </div>

                  {/* Offers */}
                  {item.offers ? (
                    <div className="offers-section">
                      <CardGiftcardIcon className="offers-icon" fontSize="small" />
                      <span className="offers-text">{item.offers}</span>
                    </div>
                  ) : (
                    <div className="no-offers-section">
                      <span className="no-offers-text">No current offers</span>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div className="updated-section">
                    Updated {item.lastUpdated}
                  </div>
                </div>
              ) : (
                /* List View */
                <div className="list-content">
                  <div className="list-icon">{item.icon}</div>
                  <div className="list-main">
                    <div className="list-header">
                      <h3 className="list-name">{item.name}</h3>
                      {item.trending && (
                        <span className="list-trending-badge">Trending</span>
                      )}
                    </div>
                    <div className="list-details">
                      <span className="list-rating">
                        <StarIcon className="list-star" fontSize="small" />
                        <span>{item.rating}</span>
                      </span>
                      <span className="list-distance">
                        <LocationOnIcon fontSize="small" />
                        <span>{item.distance}</span>
                      </span>
                      <span className="list-wait">
                        <AccessTimeIcon fontSize="small" />
                        <span>{item.waitTime}</span>
                      </span>
                      <span className={`list-crowd-badge ${getCrowdClassName(item.crowdLevel)}`}>
                        {item.crowdLevel}
                      </span>
                    </div>
                  </div>
                  <div className="list-stats">
                    <div className={`list-popularity ${getPopularityClassName(item.popularity)}`}>
                      {item.popularity} visitors
                    </div>
                    {item.offers && (
                      <div className="list-offer-indicator">
                        🎉 Special offer
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedData.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No locations found</h3>
            <p className="empty-description">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalInsightsPage;
