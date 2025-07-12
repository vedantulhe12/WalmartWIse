// src/pages/StoreMap.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowBack, 
  Map, 
  Search, 
  Store, 
  LocationOn,
  FilterList,
  Clear
} from "@mui/icons-material";
import { 
  IconButton, 
  TextField, 
  InputAdornment, 
  Chip,
  Typography,
  Box,
  Paper,
  Tooltip
} from "@mui/material";
import EnhancedWalmartFloorPlan from "../components/layouts/SmallLayout";
import "./StoreMap.css";

const StoreMap = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState(null);
  const [layoutType, setLayoutType] = useState("small");
  const [highlightCategory, setHighlightCategory] = useState("");

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

  const renderLayout = () => {
    if (!selectedStore) return <p>Loading store map...</p>;

    const layoutProps = {
      searchKeyword: highlightCategory, // pass it to EnhancedWalmartFloorPlan
    };

    switch (layoutType) {
      case "small": return <EnhancedWalmartFloorPlan {...layoutProps} />;
      case "medium": return <EnhancedWalmartFloorPlan {...layoutProps} />;
      case "large": return <EnhancedWalmartFloorPlan {...layoutProps} />;
      default: return <p>Unknown layout type.</p>;
    }
  };

  const handleClearSearch = () => {
    setHighlightCategory("");
  };

  const getLayoutDisplayName = () => {
    switch (layoutType) {
      case "small": return "Compact Store";
      case "medium": return "Standard Store";
      case "large": return "Supercenter";
      default: return "Store";
    }
  };

  return (
    <div className="store-map-page">
      <Paper elevation={2} className="map-header">
        <Box className="header-top">
          <Tooltip title="Back to Dashboard">
            <IconButton 
              onClick={() => navigate("/dashboard")} 
              className="back-btn"
              color="primary"
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
          
          <Box className="header-title">
            <Map className="map-icon" />
            <Typography variant="h4" component="h1" className="title-text">
              Store Map
            </Typography>
          </Box>

          <Box className="store-info">
            {selectedStore && (
              <>
                <Chip 
                  icon={<Store />} 
                  label={selectedStore.name || "Store"} 
                  variant="outlined" 
                  className="store-chip"
                />
                <Chip 
                  icon={<LocationOn />} 
                  label={`${selectedStore.city}, ${selectedStore.state}`} 
                  variant="outlined" 
                  className="location-chip"
                />
                <Chip 
                  icon={<FilterList />} 
                  label={getLayoutDisplayName()} 
                  color="primary" 
                  variant="filled" 
                  className="layout-chip"
                />
              </>
            )}
          </Box>
        </Box>

        <Box className="search-container">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search category (e.g., snacks, electronics, groceries)"
            value={highlightCategory}
            onChange={(e) => setHighlightCategory(e.target.value.toLowerCase())}
            className="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: highlightCategory && (
                <InputAdornment position="end">
                  <Tooltip title="Clear search">
                    <IconButton onClick={handleClearSearch} size="small">
                      <Clear />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>

      <div className="layout-container">
        {renderLayout()}
      </div>
    </div>
  );
};

export default StoreMap;