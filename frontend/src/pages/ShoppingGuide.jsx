import React, { useState } from "react";
import {
  ShoppingCart,
  Room,
  ArrowForward,
  Replay,
  Check,
  Clear,
  AccessTime,
  TrendingUp,
  FlashOn,
  Star,
  TrackChanges,
  EmojiEvents,
  ExpandMore,
  FilterList,
  Search,
  Add,
  Remove,
  Egg,
  Cookie,
  LocalCafe,
  Smartphone,
  Apple,
  SetMeal,
  Cake
} from "@mui/icons-material";

import "./ShoppingGuide.css";

const CATEGORIES = [
  { id: "dairy", name: "Dairy & Eggs", icon: Egg, color: "#4F46E5", items: ["Milk", "Cheese", "Yogurt", "Butter", "Eggs"] },
  { id: "snacks", name: "Snacks & Treats", icon: Cookie, color: "#F59E0B", items: ["Chips", "Cookies", "Nuts", "Crackers", "Candy"] },
  { id: "beverages", name: "Beverages", icon: LocalCafe, color: "#10B981", items: ["Soda", "Juice", "Water", "Coffee", "Tea"] },
  { id: "electronics", name: "Electronics", icon: Smartphone, color: "#8B5CF6", items: ["Batteries", "Cables", "Headphones", "Chargers", "Accessories"] },
  { id: "produce", name: "Fresh Produce", icon: Apple, color: "#EF4444", items: ["Apples", "Bananas", "Lettuce", "Tomatoes", "Carrots"] },
  { id: "meat", name: "Meat & Seafood", icon: SetMeal, color: "#DC2626", items: ["Chicken", "Beef", "Pork", "Fish", "Shrimp"] },
  { id: "bakery", name: "Bakery Fresh", icon: Cake, color: "#F97316", items: ["Bread", "Pastries", "Cakes", "Muffins", "Bagels"] },
];

const departmentMap = {
  dairy: { location: "Aisle 3 - Refrigerated Section", time: "2-3 min", difficulty: "Easy" },
  snacks: { location: "Aisle 7 - Packaged Goods", time: "3-4 min", difficulty: "Easy" },
  beverages: { location: "Aisle 5 - Cold Drinks", time: "2-3 min", difficulty: "Easy" },
  electronics: { location: "Tech Zone - Customer Service", time: "5-7 min", difficulty: "Medium" },
  produce: { location: "Front Right - Fresh Section", time: "4-6 min", difficulty: "Medium" },
  meat: { location: "Aisle 9 - Butcher Counter", time: "3-5 min", difficulty: "Medium" },
  bakery: { location: "Left Side - Near Checkout", time: "2-3 min", difficulty: "Easy" },
};

const ShoppingGuide = () => {
  const [selected, setSelected] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [animationKey, setAnimationKey] = useState(0);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const newSelected = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      setAnimationKey(prev => prev + 1);
      return newSelected;
    });
  };

  const handleGenerateGuide = () => {
    setShowGuide(true);
    setCurrentStep(0);
    setPurchased([]);
  };

  const handlePurchase = (id) => {
    setPurchased(prev => [...prev, id]);
    if (currentStep < selected.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleUnpurchase = (id) => {
    setPurchased(prev => prev.filter(item => item !== id));
  };

  const handleReset = () => {
    setSelected([]);
    setPurchased([]);
    setShowGuide(false);
    setCurrentStep(0);
    setSearchTerm("");
  };

  const getProgress = () => {
    return selected.length > 0 ? (purchased.length / selected.length) * 100 : 0;
  };

  const getTotalTime = () => {
    return selected.reduce((total, id) => {
      const time = departmentMap[id]?.time || "2-3 min";
      const avgTime = parseInt(time.split('-')[0]) + 1;
      return total + avgTime;
    }, 0);
  };

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const remainingItems = selected.filter(id => !purchased.includes(id));

  return (
    <div className="guide-container">
      <div className="guide-header">
        <div className="guide-header-icon">
          <ShoppingCart fontSize="large" />
          <div className="icon-pulse" />
        </div>
        <h1 className="guide-title">
          <span className="title-gradient">Smart Shopping</span>
          <span className="title-accent">Experience</span>
        </h1>
        <p className="guide-subtitle">AI-Powered Shopping Route Optimization</p>
        {selected.length > 0 && (
          <div className="quick-stats">
            <div className="stat-item"><FlashOn fontSize="small" /><span>{selected.length} Categories</span></div>
            <div className="stat-item"><AccessTime fontSize="small" /><span>~{getTotalTime()} min</span></div>
            <div className="stat-item"><TrackChanges fontSize="small" /><span>{Math.round(getProgress())}% Complete</span></div>
          </div>
        )}
      </div>

      {!showGuide ? (
        <div className="selection-section">
          <div className="search-filter-bar">
            <div className="search-container">
              <Search fontSize="small" />
              <input 
                type="text" 
                placeholder="Search categories..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-input" 
              />
            </div>
            <button className="filter-button">
              <FilterList fontSize="small" /> Filter
            </button>
          </div>

          <div className="category-grid" key={animationKey}>
            {filteredCategories.map((cat, index) => {
              const IconComponent = cat.icon;
              const isSelected = selected.includes(cat.id);
              return (
                <div
                  key={cat.id}
                  className={`category-card ${isSelected ? "selected" : ""}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`, 
                    '--category-color': cat.color 
                  }}
                  onClick={() => toggleSelect(cat.id)}
                >
                  <div className="category-card-inner">
                    <div className="category-header">
                      <div className="category-icon" style={{ backgroundColor: cat.color + '15' }}>
                        <IconComponent fontSize="small" style={{ color: cat.color }} />
                      </div>
                      {isSelected && <div className="selected-badge"><Check fontSize="small" /></div>}
                    </div>
                    <h3 className="category-name">{cat.name}</h3>
                    <div className="category-items">
                      {cat.items.slice(0, 3).map((item, i) => (
                        <span key={i} className="category-item">{item}</span>
                      ))}
                      {cat.items.length > 3 && (
                        <span className="category-item-more">+{cat.items.length - 3} more</span>
                      )}
                    </div>
                    <div className="category-stats">
                      <div className="stat">
                        <AccessTime fontSize="small" />
                        <span>{departmentMap[cat.id]?.time}</span>
                      </div>
                      <div className="stat">
                        <Room fontSize="small" />
                        <span>{departmentMap[cat.id]?.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="action-section">
            <button
              onClick={handleGenerateGuide}
              disabled={selected.length === 0}
              className="generate-button"
            >
              <TrendingUp fontSize="small" />
              <span>Generate Smart Route</span>
              <ArrowForward fontSize="small" />
            </button>
            {selected.length > 0 && (
              <div className="selection-summary">
                <div className="summary-stats">
                  <div className="summary-item">
                    <Star fontSize="small" />
                    <span>{selected.length} selected</span>
                  </div>
                  <div className="summary-item">
                    <AccessTime fontSize="small" />
                    <span>~{getTotalTime()} minutes</span>
                  </div>
                </div>
                <button onClick={handleReset} className="clear-button">
                  <Clear fontSize="small" /> Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="guide-result">
          <h2>Your Smart Route</h2>
          <div className="route-container">
            {selected.map((id, index) => {
              const category = CATEGORIES.find((c) => c.id === id);
              const IconComponent = category?.icon;
              const isPurchased = purchased.includes(id);
              const isCurrent = !isPurchased && index === currentStep;
              const isNext = !isPurchased && index > currentStep;

              return (
                <div key={id} className={`route-item ${isPurchased ? 'purchased' : ''} ${isCurrent ? 'current' : ''} ${isNext ? 'pending' : ''}`}>
                  <div className="route-step">
                    <div className="step-indicator">
                      {isPurchased ? <Check fontSize="small" /> : <span>{index + 1}</span>}
                    </div>
                  </div>
                  <div className="route-content">
                    <div className="route-header">
                      <div className="route-icon">
                        <IconComponent fontSize="small" />
                      </div>
                      <div className="route-info">
                        <h3>{category?.name}</h3>
                        <p>{departmentMap[id]?.location}</p>
                      </div>
                      <div className="route-meta">
                        <span>{departmentMap[id]?.time}</span>
                        <span>{departmentMap[id]?.difficulty}</span>
                      </div>
                    </div>
                    <div className="route-actions">
                      {isPurchased ? (
                        <button onClick={() => handleUnpurchase(id)} className="undo-button">
                          <Replay fontSize="small" /> Undo
                        </button>
                      ) : (
                        <button 
                          onClick={() => handlePurchase(id)} 
                          className="purchase-button" 
                          disabled={!isCurrent && !isNext}
                        >
                          <Add fontSize="small" /> Mark as Purchased
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="result-actions">
            <button onClick={handleReset} className="reset-button">
              <Replay fontSize="small" /> Start New Shopping Trip
            </button>
            {purchased.length === selected.length && (
              <div className="completion-celebration">
                <EmojiEvents fontSize="large" />
                <h3>Shopping Complete!</h3>
                <p>Great job! You've purchased everything on your list.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingGuide;