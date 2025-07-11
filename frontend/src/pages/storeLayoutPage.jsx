import React from "react";
import SmallLayout from "../components/layouts/SmallLayout";
import MediumLayout from "../components/layouts/MediumLayout";
import LargeLayout from "../components/layouts/LargeLayout";

const StoreLayoutPage = () => {
  const selectedStore = JSON.parse(localStorage.getItem("selectedStore"));

  if (!selectedStore) {
    return <p className="text-center mt-10 text-gray-600">No store selected.</p>;
  }

  const { name, city, state } = selectedStore;

  // Infer layout type based on state (or any logic you want)
  const inferLayoutType = (store) => {
    const largeStates = ["CA", "NY", "TX", "FL"];
    const mediumStates = ["GA", "IL", "MI", "PA"];

    if (largeStates.includes(store.state)) return "large";
    if (mediumStates.includes(store.state)) return "medium";
    return "small";
  };

  const layoutType = inferLayoutType(selectedStore);

  const renderLayout = () => {
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-600 mb-6">
        {city}, {state} — Layout: <b>{layoutType}</b>
      </p>
      {renderLayout()}
    </div>
  );
};

export default StoreLayoutPage;
