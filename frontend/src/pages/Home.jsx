import React, { useState, useEffect } from 'react';
import GlobeComponent from "./Globe"; // Import your actual GlobeComponent
import './Home.css'; // Import the CSS file

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCountryClick = (countryName) => {
    console.log("Country clicked:", countryName);
    // You can navigate to: navigate(`/stores/${countryName}`);
  };

  const features = [
    {
      icon: "📍",
      title: "Global Store Locator",
      description: "Find Walmart stores in over 25 countries worldwide"
    },
    {
      icon: "🔍",
      title: "Smart Search", 
      description: "Advanced filters to find exactly what you need"
    },
    {
      icon: "⭐",
      title: "Real-time Data",
      description: "Live inventory and store hours information"
    }
  ];

  const stats = [
    { number: "10,500+", label: "Global Stores" },
    { number: "25+", label: "Countries" },
    { number: "240M+", label: "Weekly Customers" }
  ];

  return (
    <div className="homepage">
      {/* Animated background elements */}
      <div className="background-animation">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
      </div>

      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <span>W</span>
            </div>
            <span className="logo-text">WalmartWise</span>
          </div>
          <button className="nav-search-btn">
            <span className="search-icon">🔍</span>
            <span>Search Stores</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="main-content">
        <div className={`hero-container ${isVisible ? 'visible' : ''}`}>
          
          {/* Main Hero Grid */}
          <div className="hero-grid">
            
            {/* Left: Hero Content */}
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <span className="badge-icon">🌍</span>
                  <span>Discover Walmart Worldwide</span>
                </div>
                
                <h1 className="hero-title">
                  <span className="title-explore">Explore</span>
                  <br />
                  <span className="title-walmart">Global Walmart</span>
                </h1>
                
                <p className="hero-description">
                  Navigate through our interactive globe to discover Walmart stores across continents. 
                  Find locations, hours, services, and exclusive offers in your area.
                </p>
              </div>

              <div className="hero-buttons">
                <button className="btn-primary">
                  <span>Start Exploring</span>
                  <span className="btn-arrow">→</span>
                </button>
                <button className="btn-secondary">
                  View Features
                </button>
              </div>

              {/* Stats */}
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Globe Component */}
            <div className="globe-section">
              <div className="globe-glow"></div>
              <div className="globe-container">
                <GlobeComponent onCountryClick={handleCountryClick} />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="features-header">
              <h2 className="features-title">
                Powerful Features
              </h2>
              <p className="features-subtitle">
                Everything you need to find and explore Walmart stores worldwide
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <h2 className="cta-title">
              Ready to Explore?
            </h2>
            <p className="cta-description">
              Click on any country in our interactive globe to start discovering Walmart stores near you.
            </p>
            <button className="cta-button">
              <span>Start Your Journey</span>
              <span className="cta-arrow">⬇️</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;