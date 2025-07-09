import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [userName] = useState('Vedant');
  const [storeLocation] = useState('Pune Central Mall, Maharashtra');

  const quickActions = [
    {
      id: 'shopping-guide',
      icon: '🛍️',
      title: 'Start Shopping Guide',
      description: 'Get personalized shopping recommendations',
      path: '/guide'
    },
    {
      id: 'store-map',
      icon: '🗺️',
      title: 'View Store Map',
      description: 'Navigate through store sections',
      path: '/map'
    },
    {
      id: 'chat-assistant',
      icon: '🤖',
      title: 'Chat with Assistant',
      description: 'Get instant help and support',
      path: '/chat'
    },
    {
      id: 'local-insights',
      icon: '📊',
      title: 'See Local Insights',
      description: 'View trending products and offers',
      path: '/insights'
    }
  ];

  const handleQuickAction = (action) => {
    // In a real app, you'd use React Router's navigate
    console.log(`Navigating to ${action.path}`);
    // Example: navigate(action.path);
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome {userName}</h1>
          <p className="subtitle">Ready to explore today's best deals?</p>
        </div>
        
        <div className="user-profile">
          <div className="profile-avatar">
            <span>{userName.charAt(0)}</span>
          </div>
          <div className="profile-info">
            <span className="profile-name">{userName}</span>
            <span className="profile-status">Premium Member</span>
          </div>
        </div>
      </div>

      {/* Store Location Section */}
      <div className="store-location-section">
        <div className="location-header">
          <div className="location-icon">📍</div>
          <div className="location-info">
            <h3>Your Store Location</h3>
            <p>{storeLocation}</p>
          </div>
          <button className="change-location-btn">Change</button>
        </div>

        {/* Store Map Preview */}
        <div className="map-preview">
          <div className="map-placeholder">
            <div className="map-content">
              <div className="store-marker">🏬</div>
              <div className="map-grid">
                <div className="map-section electronics">Electronics</div>
                <div className="map-section clothing">Clothing</div>
                <div className="map-section groceries">Groceries</div>
                <div className="map-section pharmacy">Pharmacy</div>
              </div>
            </div>
            <div className="map-overlay">
              <span>Interactive Store Map</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className="action-card"
              onClick={() => handleQuickAction(action)}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
              <div className="action-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Highlights Section */}
      <div className="highlights-section">
        <h2>Today's Highlights</h2>
        <div className="highlights-grid">
          <div className="highlight-card trending">
            <div className="highlight-icon">🔥</div>
            <div className="highlight-content">
              <h4>Trending Now</h4>
              <p>Summer collection items</p>
            </div>
          </div>
          
          <div className="highlight-card offers">
            <div className="highlight-icon">🎉</div>
            <div className="highlight-content">
              <h4>Special Offers</h4>
              <p>Up to 50% off on electronics</p>
            </div>
          </div>
          
          <div className="highlight-card new-arrivals">
            <div className="highlight-icon">✨</div>
            <div className="highlight-content">
              <h4>New Arrivals</h4>
              <p>Latest fashion trends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon shopping">🛒</div>
            <div className="activity-content">
              <p>Completed shopping at Electronics section</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          
          <div className="activity-item loyalty">🏆</div>
          <div className="activity-content">
            <p>Earned 150 loyalty points</p>
            <span className="activity-time">1 day ago</span>
          </div>
          
          <div className="activity-item guide">📖</div>
          <div className="activity-content">
            <p>Completed "Store Navigation" guide</p>
            <span className="activity-time">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;