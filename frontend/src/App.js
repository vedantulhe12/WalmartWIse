import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage"; 
import Dashboard from "./pages/Dashboard";
import ShoppingGuide from "./pages/ShoppingGuide";
import StoreMap from "./pages/StoreMap";
import LocalInsightsPage from "./pages/LocalInsightPage";
import StepByStepGuide from "./pages/StepByStepGuide";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guide" element={<ShoppingGuide />} />
        <Route path="/map" element={<StoreMap />} />
        <Route path="/insights" element={<LocalInsightsPage />} />
        <Route path="/step-by-step" element={<StepByStepGuide />} />
      </Routes>
    </>
  );
};

export default App;
