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
  /*  Helper to render the correct store‑layout component               */
  /* ------------------------------------------------------------------ */
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
