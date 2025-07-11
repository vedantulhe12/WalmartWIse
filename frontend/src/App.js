import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage"; 
import Dashboard from "./pages/Dashboard";
import StoreLayoutPage from "./pages/storeLayoutPage.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/store-layout" element={<StoreLayoutPage />} /> {/* ✅ new route */}
      </Routes>
    </>
  );
};

export default App;
