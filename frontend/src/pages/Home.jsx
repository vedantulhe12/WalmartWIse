import React, { useState, useEffect, useRef } from 'react';

import GlobeComponent from '../pages/Globe';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringMagnify, setIsHoveringMagnify] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
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
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHoveringMagnify ? 'magnify' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-outline"></div>
      </div>

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
                  <span 
                    className="title-explore magnify-text"
                    onMouseEnter={() => setIsHoveringMagnify(true)}
                    onMouseLeave={() => setIsHoveringMagnify(false)}
                  >
                    Explore
                  </span>
                  <br />
                  <span 
                    className="title-walmart magnify-text"
                    onMouseEnter={() => setIsHoveringMagnify(true)}
                    onMouseLeave={() => setIsHoveringMagnify(false)}
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
                    <div 
                      className="stat-number magnify-text"
                      onMouseEnter={() => setIsHoveringMagnify(true)}
                      onMouseLeave={() => setIsHoveringMagnify(false)}
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
                className="features-title magnify-text"
                onMouseEnter={() => setIsHoveringMagnify(true)}
                onMouseLeave={() => setIsHoveringMagnify(false)}
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
                    className="feature-title magnify-text"
                    onMouseEnter={() => setIsHoveringMagnify(true)}
                    onMouseLeave={() => setIsHoveringMagnify(false)}
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
              className="cta-title magnify-text"
              onMouseEnter={() => setIsHoveringMagnify(true)}
              onMouseLeave={() => setIsHoveringMagnify(false)}
            >
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

      <style jsx>{`
        .homepage {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
          color: white;
          overflow-x: hidden;
          position: relative;
        }

        /* Custom Cursor Styles */
        .homepage  *{
          cursor: none !important;
        }

        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease-out;
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          background: #fbbf24;
          border-radius: 50%;
          position: absolute;
          top: -4px;
          left: -4px;
          transition: all 0.2s ease-out;
        }

        .cursor-outline {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(251, 191, 36, 0.3);
          border-radius: 50%;
          position: absolute;
          top: -20px;
          left: -20px;
          transition: all 0.3s ease-out;
        }

        .custom-cursor.magnify .cursor-dot {
          transform: scale(3);
          background: #fcd34d;
          box-shadow: 0 0 20px rgba(252, 211, 77, 0.8);
        }

        .custom-cursor.magnify .cursor-outline {
          transform: scale(2.5);
          border-color: rgba(252, 211, 77, 0.8);
          border-width: 3px;
          box-shadow: 0 0 30px rgba(252, 211, 77, 0.3);
        }

        .magnify-text {
          transition: all 0.3s ease-out;
          position: relative;
          z-index: 1;
        }

        .magnify-text:hover {
          transform: scale(1.1);
          text-shadow: 0 0 30px rgba(252, 211, 77, 0.6);
        }

        .title-explore.magnify-text:hover {
          background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-walmart.magnify-text:hover {
          background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-number.magnify-text:hover {
          color: #fcd34d;
        }

        .features-title.magnify-text:hover {
          background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feature-title.magnify-text:hover {
          color: #fcd34d;
        }

        .cta-title.magnify-text:hover {
          color: #fcd34d;
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
          border-color: rgba(251, 191, 36, 0.4);
          background: rgba(251, 191, 36, 0.1);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(251, 191, 36, 0.2);
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .feature-card.active .feature-icon {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
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
        }

        @media (min-width: 1024px) {
          .cta-title {
            font-size: 2.5rem;
          }
        }

        .cta-description {
          font-size: 1.25rem;
          color: #dbeafe;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: black;
          font-weight: bold;
          font-size: 1.125rem;
          border: none;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 15px 40px rgba(251, 191, 36, 0.3);
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(251, 191, 36, 0.4);
        }

        .cta-arrow {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0px); }
          40%, 43% { transform: translateY(-10px); }
          70% { transform: translateY(-5px); }
        }

        button:focus,
        .feature-card:focus {
          outline: 2px solid #fbbf24;
          outline-offset: 2px;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .stats-grid {
            gap: 1rem;
          }
          
          .stat-number {
            font-size: 1.25rem;
          }
          
          .features-section {
            padding: 1.5rem;
          }
          
          .cta-section {
            padding: 2rem;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Home;