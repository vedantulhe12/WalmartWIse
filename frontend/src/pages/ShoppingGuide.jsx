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
  Cake,
  Close
} from "@mui/icons-material";

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
  const [showFilters, setShowFilters] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterTime, setFilterTime] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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
    setFilterDifficulty("all");
    setFilterTime("all");
    setFilterStatus("all");
  };

  const clearFilters = () => {
    setFilterDifficulty("all");
    setFilterTime("all");
    setFilterStatus("all");
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

  const filteredCategories = CATEGORIES.filter(cat => {
    // Search filter
    if (searchTerm && !cat.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Difficulty filter
    if (filterDifficulty !== "all" && departmentMap[cat.id]?.difficulty.toLowerCase() !== filterDifficulty) {
      return false;
    }

    // Time filter
    if (filterTime !== "all") {
      const timeString = departmentMap[cat.id]?.time || "2-3 min";
      const timeNum = parseInt(timeString.split('-')[0]);
      if (filterTime === "quick" && timeNum > 3) return false;
      if (filterTime === "medium" && (timeNum <= 3 || timeNum > 5)) return false;
      if (filterTime === "long" && timeNum <= 5) return false;
    }

    // Status filter
    if (filterStatus !== "all") {
      const isSelected = selected.includes(cat.id);
      if (filterStatus === "selected" && !isSelected) return false;
      if (filterStatus === "unselected" && isSelected) return false;
    }

    return true;
  });

  const hasActiveFilters = filterDifficulty !== "all" || filterTime !== "all" || filterStatus !== "all";

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <ShoppingCart style={{ fontSize: '48px', color: 'white' }} />
        </div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          margin: 0, 
          color: 'white'
        }}>
          Smart Shopping Experience
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', margin: '10px 0' }}>
          AI-Powered Shopping Route Optimization
        </p>
        {selected.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px', 
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'white',
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '20px'
            }}>
              <FlashOn style={{ fontSize: '16px' }} />
              <span>{selected.length} Categories</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'white',
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '20px'
            }}>
              <AccessTime style={{ fontSize: '16px' }} />
              <span>~{getTotalTime()} min</span>
            </div>
          </div>
        )}
      </div>

      {!showGuide ? (
        <div style={{ 
          background: 'rgba(255,255,255,0.95)', 
          borderRadius: '20px', 
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          {/* Search and Filter Bar */}
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input 
                type="text" 
                placeholder="Search categories..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 45px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: hasActiveFilters ? '#4f46e5' : '#f5f5f5',
                color: hasActiveFilters ? 'white' : '#333',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <FilterList />
              Filter
              {hasActiveFilters && <span style={{ 
                background: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                width: '8px',
                height: '8px',
                marginLeft: '5px'
              }}></span>}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div style={{ 
              background: '#f8f9fa', 
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h3 style={{ margin: 0, color: '#333' }}>Filter Options</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px'
                  }}
                >
                  <Close />
                </button>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Difficulty Level
                  </label>
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d0d0d0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Time Range
                  </label>
                  <select
                    value={filterTime}
                    onChange={(e) => setFilterTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d0d0d0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="all">All Times</option>
                    <option value="quick">Quick (≤3 min)</option>
                    <option value="medium">Medium (4-5 min)</option>
                    <option value="long">Long (≥6 min)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Selection Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d0d0d0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="all">All Items</option>
                    <option value="selected">Selected Only</option>
                    <option value="unselected">Unselected Only</option>
                  </select>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '15px',
                borderTop: '1px solid #e0e0e0'
              }}>
                <button
                  onClick={clearFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <Clear />
                  Clear Filters
                </button>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  Showing {filteredCategories.length} of {CATEGORIES.length} categories
                </span>
              </div>
            </div>
          )}

          {/* Categories Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {filteredCategories.map((cat, index) => {
              const IconComponent = cat.icon;
              const isSelected = selected.includes(cat.id);
              return (
                <div
                  key={cat.id}
                  onClick={() => toggleSelect(cat.id)}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    border: `2px solid ${isSelected ? cat.color : 'transparent'}`,
                    transition: 'all 0.3s ease',
                    boxShadow: isSelected ? `0 4px 20px ${cat.color}20` : '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: cat.color + '15',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent style={{ color: cat.color }} />
                    </div>
                    {isSelected && (
                      <div style={{
                        background: cat.color,
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check style={{ fontSize: '16px' }} />
                      </div>
                    )}
                  </div>
                  
                  <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>{cat.name}</h3>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                    {cat.items.slice(0, 3).map((item, i) => (
                      <span key={i} style={{
                        background: '#f5f5f5',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        {item}
                      </span>
                    ))}
                    {cat.items.length > 3 && (
                      <span style={{
                        background: '#e0e0e0',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#888'
                      }}>
                        +{cat.items.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '14px' }}>
                      <AccessTime style={{ fontSize: '16px' }} />
                      <span>{departmentMap[cat.id]?.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '14px' }}>
                      <Room style={{ fontSize: '16px' }} />
                      <span>{departmentMap[cat.id]?.difficulty}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
              <Search style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }} />
              <h3 style={{ margin: '0 0 10px 0', color: '#888' }}>No categories found</h3>
              <p style={{ margin: 0, color: '#999' }}>Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Action Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <button
              onClick={handleGenerateGuide}
              disabled={selected.length === 0}
              style={{
                background: selected.length === 0 ? '#ccc' : 'linear-gradient(45deg, #4f46e5, #7c3aed)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              <TrendingUp />
              Generate Smart Route
              <ArrowForward />
            </button>
            
            {selected.length > 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                maxWidth: '500px',
                background: '#f8f9fa',
                padding: '15px 20px',
                borderRadius: '12px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#555' }}>
                    <Star style={{ fontSize: '16px' }} />
                    <span>{selected.length} selected</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#555' }}>
                    <AccessTime style={{ fontSize: '16px' }} />
                    <span>~{getTotalTime()} minutes</span>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Clear />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ 
          background: 'rgba(255,255,255,0.95)', 
          borderRadius: '20px', 
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Your Smart Route</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            {selected.map((id, index) => {
              const category = CATEGORIES.find((c) => c.id === id);
              const IconComponent = category?.icon;
              const isPurchased = purchased.includes(id);
              const isCurrent = !isPurchased && index === currentStep;

              return (
                <div key={id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '12px',
                  border: `2px solid ${isPurchased ? '#10b981' : isCurrent ? '#4f46e5' : '#e0e0e0'}`,
                  opacity: isPurchased ? 0.7 : 1
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isPurchased ? '#10b981' : isCurrent ? '#4f46e5' : '#e0e0e0',
                    color: isPurchased || isCurrent ? 'white' : '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600'
                  }}>
                    {isPurchased ? <Check /> : index + 1}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
                      <IconComponent style={{ color: category?.color }} />
                      <h3 style={{ margin: 0, color: '#333' }}>{category?.name}</h3>
                    </div>
                    <p style={{ margin: 0, color: '#666' }}>{departmentMap[id]?.location}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      <span style={{ fontSize: '12px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px' }}>
                        {departmentMap[id]?.time}
                      </span>
                      <span style={{ fontSize: '12px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px' }}>
                        {departmentMap[id]?.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    {isPurchased ? (
                      <button
                        onClick={() => handleUnpurchase(id)}
                        style={{
                          background: '#f97316',
                          color: 'white',
                          border: 'none',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Replay />
                        Undo
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(id)}
                        style={{
                          background: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Add />
                        Mark as Purchased
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleReset}
              style={{
                background: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto'
              }}
            >
              <Replay />
              Start New Shopping Trip
            </button>
            
            {purchased.length === selected.length && (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                borderRadius: '16px',
                marginTop: '20px'
              }}>
                <EmojiEvents style={{ fontSize: '48px', marginBottom: '10px' }} />
                <h3 style={{ margin: '0 0 10px 0' }}>Shopping Complete!</h3>
                <p style={{ margin: 0 }}>Great job! You've purchased everything on your list.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingGuide;