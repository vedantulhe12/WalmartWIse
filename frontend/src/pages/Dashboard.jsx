import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import SmallLayout from "../components/layouts/SmallLayout";
import MediumLayout from "../components/layouts/MediumLayout";
import LargeLayout from "../components/layouts/LargeLayout";
import {auth} from "../firebase";
import ChatDrawer from "../components/chat/chatDrawer"; // <‑‑ adjust path/case if needed
import { useNavigate } from "react-router-dom"; 

const Dashboard = () => {
  const navigate = useNavigate();
const [userName, setUserName] = useState(""); // updated to allow dynamic name
  const [selectedStore, setSelectedStore] = useState(null);
  const [layoutType, setLayoutType] = useState("small");
  const [isChatOpen, setIsChatOpen] = useState(false); // chat‑drawer state
  const [currentHighlight, setCurrentHighlight] = useState(1); // for carousel

  

  /* ------------------------------------------------------------------ */
  /*  Load store selection and decide which layout component to show    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("selectedStore"));
    setSelectedStore(store);

    if (store) {
      const largeStates = ["CA", "NY", "TX", "FL"];
      const mediumStates = ["GA", "IL", "MI", "PA"];
      if (largeStates.includes(store.state)) setLayoutType("large");
      else if (mediumStates.includes(store.state)) setLayoutType("medium");
      else setLayoutType("small");
    }
  }, []);

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user) {
      navigate("/login"); // 🔒 redirect to login if not signed in
    } else {
      setUserName(user.displayName || "User"); // 👤 display name from Firebase
    }
  });

  return () => unsubscribe(); // cleanup on unmount
}, [navigate]);
  
  /* ------------------------------------------------------------------ */
  /*  Quick‑action definitions                                          */
  /* ------------------------------------------------------------------ */
  const quickActions = [
    {
      id: "shopping-guide",
      icon: "🛍️",
      title: "Start Shopping Guide",
      description: "Get personalized shopping recommendations",
      path: "/guide",
    },
    {
      id: "store-map",
      icon: "🗺️",
      title: "View Store Map",
      description: "Navigate through store sections",
      path: "/map",
    },
    {
      id: "chat-assistant",
      icon: "🤖",
      title: "Chat with Assistant",
      description: "Get instant help and support",
      path: "/chat", // retained for reference
    },
    {
      id: "local-insights",
      icon: "📊",
      title: "See Local Insights",
      description: "View trending products and offers",
      path: "/insights",
    },
  ];

  /* ------------------------------------------------------------------ */
  /*  Highlights data                                                   */
  /* ------------------------------------------------------------------ */
  const highlights = [
    {
      id: 0,
      title: "Summer Collection",
      description: "Discover the hottest trends and must-have items for this summer season.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      badge: "Hot 🔥",
      buttonText: "Shop Now"
    },
    {
      id: 1,
      title: "Special Electronics Deal",
      description: "Limited time offer on premium electronics. Get up to 50% off on selected items.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=250&fit=crop",
      badge: "50% OFF 🎉",
      buttonText: "Grab Deal"
    },
    {
      id: 2,
      title: "Fashion Forward",
      description: "Latest fashion arrivals featuring cutting-edge designs and premium quality.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
      badge: "New ✨",
      buttonText: "Explore"
    }
  ];

  /* ------------------------------------------------------------------ */
  /*  Click handler for the quick‑action cards                           */
  /* ------------------------------------------------------------------ */
  const handleQuickAction = (action) => {
    if (action.id === "chat-assistant") {
      setIsChatOpen(true);                      // open the drawer
      return;
    }
    navigate(action.path); // ✅ Actually navigate to the page

    // If you use react‑router:
    // navigate(action.path);
  };

  /* ------------------------------------------------------------------ */
  /*  Carousel navigation functions                                      */
  /* ------------------------------------------------------------------ */
  const nextHighlight = () => {
    setCurrentHighlight((prev) => (prev + 1) % highlights.length);
  };

  const prevHighlight = () => {
    setCurrentHighlight((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const goToHighlight = (index) => {
    setCurrentHighlight(index);
  };

  /* ------------------------------------------------------------------ */
  /*  Auto-rotate carousel                                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const interval = setInterval(nextHighlight, 5000); // Auto-rotate every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const renderStoreLayout = () => {
    if (!selectedStore) return <p>Loading store layout...</p>;

    switch (layoutType) {
      case "small":
        return <SmallLayout store={selectedStore} />;
      case "medium":
        return <MediumLayout store={selectedStore} />;
      case "large":
        return <LargeLayout store={selectedStore} />;
      default:
        return <p>Unknown layout type.</p>;
    }
  };

  /* ------------------------------------------------------------------ */
  /*  JSX                                                               */
  /* ------------------------------------------------------------------ */
  return (
    <div className="dashboard">
      {/* ---------- Header ---------- */}
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

      {/* ---------- Store location & layout ---------- */}
      {selectedStore && (
        <div className="store-location-section">
          <div className="location-header">
            <div className="location-icon">📍</div>
            <div className="location-info">
              <h3>Your Store Location</h3>
              <p>
                {selectedStore.name}, {selectedStore.city}, {selectedStore.state}
              </p>
            </div>
            <button className="change-location-btn">Change</button>
          </div>

          <div className="store-layout-container">
            <h2 className="text-xl font-bold mb-2">
              Store Layout ({layoutType})
            </h2>
            <div className="store-layout-box">{renderStoreLayout()}</div>
          </div>
        </div>
      )}

      {/* ---------- Quick Actions ---------- */}
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

      {/* ---------- Highlights ---------- */}
      <div className="highlights-section-new">
        <h2>Today's Highlights</h2>
        <div className="highlights-carousel">
          {highlights.map((highlight, index) => {
            // Calculate position based on current highlight
            let position;
            let cardClass = "highlight-card-new";
            
            if (index === currentHighlight) {
              position = "center";
              cardClass += " center-position active";
            } else if (index === (currentHighlight - 1 + highlights.length) % highlights.length) {
              position = "left";
              cardClass += " left-position inactive";
            } else if (index === (currentHighlight + 1) % highlights.length) {
              position = "right";
              cardClass += " right-position inactive";
            } else {
              position = "hidden";
              cardClass += " hidden-position";
            }

            return (
              <div
                key={highlight.id}
                className={cardClass}
                data-position={position}
                onClick={() => goToHighlight(index)}
              >
                <div className="highlight-image">
                  <img src={highlight.image} alt={highlight.title} />
                  <div className="highlight-badge">{highlight.badge}</div>
                </div>
                <div className="highlight-content-new">
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                  <button className="highlight-btn">{highlight.buttonText}</button>
                </div>
              </div>
            );
          })}

          {/* Navigation arrows */}
          <button className="carousel-nav prev" onClick={prevHighlight}>
            ←
          </button>
          <button className="carousel-nav next" onClick={nextHighlight}>
            →
          </button>
        </div>

        <div className="highlights-indicators">
          {highlights.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentHighlight ? 'active' : ''}`}
              onClick={() => goToHighlight(index)}
            />
          ))}
        </div>
      </div>

      {/* ---------- Recent Activity ---------- */}
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
          <div className="activity-item">
            <div className="activity-icon loyalty">🏆</div>
            <div className="activity-content">
              <p>Earned 150 loyalty points</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon guide">📖</div>
            <div className="activity-content">
              <p>Completed "Store Navigation" guide</p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Chat Drawer ---------- */}
      {isChatOpen && (
        <ChatDrawer
          open      /* remove or rename if ChatDrawer doesn’t need this prop */
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
