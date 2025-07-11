import React, { useState } from 'react';
import './EnhancedStoreLayout.css';

const EnhancedStoreLayout = ({ store, layoutType = 'small' }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const getLayoutSections = () => {
    const baseSections = [
      { id: 'grocery', name: 'Grocery', icon: '🛒', color: 'grocery', span: 4 },
      { id: 'meat', name: 'Meat & Seafood', icon: '🥩', color: 'meat', span: 3 },
      { id: 'bakery', name: 'Bakery', icon: '🍞', color: 'bakery', span: 3 },
      { id: 'checkout', name: 'Checkout', icon: '💳', color: 'checkout', span: 12 },
      { id: 'electronics', name: 'Electronics', icon: '📱', color: 'electronics', span: 3 },
      { id: 'clothing', name: 'Clothing', icon: '👕', color: 'clothing', span: 3 },
      { id: 'pharmacy', name: 'Pharmacy', icon: '💊', color: 'pharmacy', span: 3 },
      { id: 'toys', name: 'Toys', icon: '🧸', color: 'toys', span: 3 },
    ];

    const mediumSections = [
      ...baseSections,
      { id: 'deli', name: 'Deli', icon: '🧀', color: 'deli', span: 2 },
      { id: 'produce', name: 'Produce', icon: '🥬', color: 'produce', span: 3 },
      { id: 'dairy', name: 'Dairy', icon: '🥛', color: 'dairy', span: 2 },
      { id: 'frozen', name: 'Frozen', icon: '🧊', color: 'frozen', span: 3 },
      { id: 'beverages', name: 'Beverages', icon: '🥤', color: 'beverages', span: 2 },
    ];

    const largeSections = [
      ...mediumSections,
      { id: 'home', name: 'Home & Garden', icon: '🏠', color: 'home', span: 4 },
      { id: 'automotive', name: 'Automotive', icon: '🚗', color: 'automotive', span: 2 },
      { id: 'pets', name: 'Pet Supplies', icon: '🐕', color: 'pets', span: 3 },
      { id: 'health', name: 'Health & Beauty', icon: '🧴', color: 'health', span: 3 },
      { id: 'snacks', name: 'Snacks', icon: '🍿', color: 'snacks', span: 2 },
    ];

    switch (layoutType) {
      case 'large':
        return largeSections;
      case 'medium':
        return mediumSections;
      default:
        return baseSections;
    }
  };

  const sections = getLayoutSections();

  const getCompactSections = () => {
    return sections.filter(section => 
      ['grocery', 'meat', 'bakery', 'checkout', 'electronics', 'clothing', 'pharmacy'].includes(section.id)
    ).map(section => ({
      ...section,
      span: section.id === 'checkout' ? 12 : section.id === 'grocery' ? 6 : 3
    }));
  };

  const currentSections = viewMode === 'compact' ? getCompactSections() : sections;

  return (
    <div className="enhanced-store-layout">
      {/* Controls */}
      <div className="layout-controls">
        <div className="layout-info">
          <h3>Store Layout ({layoutType})</h3>
          {store && (
            <p>{store.name}, {store.city}, {store.state}</p>
          )}
        </div>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Full Layout
          </button>
          <button
            className={`toggle-btn ${viewMode === 'compact' ? 'active' : ''}`}
            onClick={() => setViewMode('compact')}
          >
            Compact
          </button>
        </div>
      </div>

      {/* Store Layout Grid */}
      <div className="store-layout-wrapper">
        <div className={`enhanced-store-grid ${layoutType}`}>
          {currentSections.map((section) => (
            <div
              key={section.id}
              className={`
                layout-section enhanced ${section.color}
                ${selectedSection === section.id ? 'selected' : ''}
              `}
              style={{ gridColumn: `span ${section.span}` }}
              onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
            >
              <div className="section-content">
                <div className="section-icon">{section.icon}</div>
                <div className="section-name">{section.name}</div>
              </div>
              <div className="section-overlay"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Section Details */}
      {selectedSection && (
        <div className="section-details">
          <div className="details-header">
            <div className="details-icon">
              {currentSections.find(s => s.id === selectedSection)?.icon}
            </div>
            <div className="details-info">
              <h4>{currentSections.find(s => s.id === selectedSection)?.name}</h4>
              <p>Click for navigation and details</p>
            </div>
            <button 
              className="close-details"
              onClick={() => setSelectedSection(null)}
            >
              ×
            </button>
          </div>
          
          <div className="details-content">
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">
                {selectedSection === 'checkout' ? 'Front of store' : 'Aisle navigation available'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Hours:</span>
              <span className="detail-value">
                {selectedSection === 'pharmacy' ? '9AM - 8PM' : '6AM - 11PM'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Special:</span>
              <span className="detail-value">
                {selectedSection === 'bakery' ? 'Fresh daily' : 'Always stocked'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="layout-legend">
        <div className="legend-item">
          <div className="legend-color selected-demo"></div>
          <span>Click to select sections</span>
        </div>
        <div className="legend-item">
          <div className="legend-color hover-demo"></div>
          <span>Hover for interactive effects</span>
        </div>
        <div className="legend-item">
          <div className="legend-color layout-demo"></div>
          <span>Toggle between views</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedStoreLayout;