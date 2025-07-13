    // src/pages/StoreMap.jsx
    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
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

    return (
        <div className="store-map-page">
        <div className="map-header">
            <button onClick={() => navigate("/dashboard")} className="back-btn">← Back</button>
            <h1>🗺️ Store Map</h1>
            <input
            type="text"
            placeholder="Search category (e.g., snacks)"
            value={highlightCategory}
            onChange={(e) => setHighlightCategory(e.target.value.toLowerCase())}
            />
        </div>

        <div className="layout-container">
            {renderLayout()}
        </div>
        </div>
    );
    };

    export default StoreMap;
