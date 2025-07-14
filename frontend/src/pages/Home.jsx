import React, { useState, useEffect, useRef, useCallback } from 'react';

// Mock Globe Component for demonstration
import GlobeComponent from '../pages/Globe'; // Adjust path/case if needed for your project structure or file structure.

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Optimized mouse move handler
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCountryClick = (countryName) => {
    console.log("Country clicked:", countryName);
    // You can navigate to: navigate(`/stores/${countryName}`);
  };

  const handleTextHover = useCallback((isEntering) => {
    setIsHovering(isEntering);
  }, []);

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
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate3d(${cursorPosition.x - 15}px, ${cursorPosition.y - 15}px, 0)`,
        }}
      >
        <div className="cursor-circle"></div>
      </div>

      {/* Animated background elements */}
      <div className="background-animation">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
      </div>

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
                  <span 
                    className="title-explore hover-text"
                    onMouseEnter={() => handleTextHover(true)}
                    onMouseLeave={() => handleTextHover(false)}
                  >
                    Explore
                  </span>
                  <br />
                  <span 
                    className="title-walmart hover-text"
                    onMouseEnter={() => handleTextHover(true)}
                    onMouseLeave={() => handleTextHover(false)}
                  >
                    Global Walmart
                  </span>
                </h1>
                
                <p className="hero-description">
                  Navigate through our interactive globe to discover Walmart stores across continents. 
                  Find locations, hours, services, and exclusive offers in your area.
                </p>
              </div>

              <div className="hero-buttons">
                <button   
                  className="btn-primary"
                  onMouseEnter={() => handleTextHover(true)}
                  onMouseLeave={() => handleTextHover(false)}
                >
                  <span>Start Exploring</span>
                  <span className="btn-arrow">→</span>
                </button>
                <button 
                  className="btn-secondary"
                  onMouseEnter={() => handleTextHover(true)}
                  onMouseLeave={() => handleTextHover(false)}
                >
                  View Features
                </button>
              </div>

              {/* Stats */}
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div 
                      className="stat-number hover-text"
                      onMouseEnter={() => handleTextHover(true)}
                      onMouseLeave={() => handleTextHover(false)}
                    >
                      {stat.number}
                    </div>
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
              <h2 
                className="features-title hover-text"
                onMouseEnter={() => handleTextHover(true)}
                onMouseLeave={() => handleTextHover(false)}
              >
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
                  <h3 
                    className="feature-title hover-text"
                    onMouseEnter={() => handleTextHover(true)}
                    onMouseLeave={() => handleTextHover(false)}
                  >
                    {feature.title}
                  </h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <h2 
              className="cta-title hover-text"
              onMouseEnter={() => handleTextHover(true)}
              onMouseLeave={() => handleTextHover(false)}
            >
              Ready to Explore?
            </h2>
            <p className="cta-description">
              Click on any country in our interactive globe to start discovering Walmart stores near you.
            </p>
            <button 
              className="cta-button"
              onMouseEnter={() => handleTextHover(true)}
              onMouseLeave={() => handleTextHover(false)}
            >
              <span>Start Your Journey</span>
              <span className="cta-arrow">⬇️</span>
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .homepage {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
          color: white;
          overflow-x: hidden;
          position: relative;
        }

        /* Custom Cursor Styles */
        .homepage * {
          cursor: none !important;
        }

        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          transition: opacity 0.2s ease;
        }

        .cursor-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }

        .custom-cursor.hovering .cursor-circle {
          width: 40px;
          height: 40px;
          background: rgba(251, 191, 36, 0.3);
          border: 2px solid rgba(251, 191, 36, 0.8);
        }

        .hover-text {
          transition: all 0.3s ease;
          cursor: none !important;
          position: relative;
          display: inline-block;
        }

        .hover-text:hover {
          transform: scale(1.05);
          text-shadow: 
            0 0 10px rgba(251, 191, 36, 0.6),
            0 0 20px rgba(251, 191, 36, 0.4);
          filter: brightness(1.2);
        }

        .background-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: pulse 6s ease-in-out infinite;
        }

        .bg-blob-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%);
          top: -200px;
          right: -200px;
        }

        .bg-blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%);
          bottom: -200px;
          left: -200px;
          animation-delay: 2s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .navigation {
          position: relative;
          z-index: 10;
          padding: 1rem 1.5rem;
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
        }

        .logo-icon span {
          color: black;
          font-weight: bold;
          font-size: 1.125rem;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(135deg, #fbbf24 0%, #fde047 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .main-content {
          position: relative;
          z-index: 10;
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s ease;
        }

        .hero-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 5rem;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .hero-text {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(251, 191, 36, 0.2);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 50px;
          color: #fcd34d;
          font-size: 0.875rem;
          font-weight: 500;
          width: fit-content;
        }

        .badge-icon {
          font-size: 1.25rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          line-height: 1.1;
        }

        @media (min-width: 1024px) {
          .hero-title {
            font-size: 4.5rem;
          }
        }

        .title-explore {
          background: linear-gradient(135deg, #ffffff 0%, #dbeafe 50%, #fcd34d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-walmart {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: #dbeafe;
          line-height: 1.6;
          max-width: 500px;
        }

        .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .hero-buttons {
            flex-direction: row;
          }
        }

        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: black;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(251, 191, 36, 0.4);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .btn-secondary {
          padding: 1rem 2rem;
          background: transparent;
          color: white;
          font-weight: 600;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          padding-top: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #fbbf24;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 1024px) {
          .stat-number {
            font-size: 2rem;
          }
        }

        .stat-label {
          font-size: 0.875rem;
          color: #dbeafe;
          font-weight: 500;
        }

        .globe-section {
          position: relative;
        }

        .globe-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
          border-radius: 1rem;
          filter: blur(20px);
        }

        .globe-container {
          position: relative;
          height: 600px;
          width: 100%;
          max-width: 590px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .features-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          margin-bottom: 5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: 1024px) {
          .features-section {
            padding: 3rem;
          }
        }

        .features-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .features-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 1024px) {
          .features-title {
            font-size: 2.5rem;
          }
        }

        .features-subtitle {
          font-size: 1.125rem;
          color: #dbeafe;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .feature-card {
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .feature-card:hover,
        .feature-card.active {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #fbbf24 0%, #fde047 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
          margin-bottom: 1rem;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .feature-description {
          color: #dbeafe;
          line-height: 1.5;
        }

        .cta-section {
          text-align: center;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 1.5rem;
          padding: 3rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .cta-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fbbf24 0%, #fde047 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 1024px) {
          .cta-title {
            font-size: 2.5rem;
          }
        }

        .cta-description {
          font-size: 1.125rem;
          color: #fcd34d;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: black;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(251, 191, 36, 0.4);
        }

        .cta-arrow {
          transition: transform 0.3s ease;
        }

        .cta-button:hover .cta-arrow {
          transform: translateY(2px);
        }
      `}</style>
    </div>
  );
};

export default Home;